import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis/cloudflare";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

// ---------------------------------------------------------------------------
// Local In-Memory sliding-window rate limiter — development fallback only.
// ---------------------------------------------------------------------------
class InMemoryRateLimiter {
  private map = new Map<string, { count: number; resetAt: number }>();
  constructor(private limitCount: number, private windowMs: number) {}

  async limit(identifier: string) {
    const now = Date.now();
    const current = this.map.get(identifier);

    if (!current || now > current.resetAt) {
      const resetAt = now + this.windowMs;
      this.map.set(identifier, { count: 1, resetAt });
      return {
        success: true,
        limit: this.limitCount,
        remaining: this.limitCount - 1,
        reset: resetAt,
      };
    }

    if (current.count >= this.limitCount) {
      return {
        success: false,
        limit: this.limitCount,
        remaining: 0,
        reset: current.resetAt,
      };
    }

    current.count += 1;
    return {
      success: true,
      limit: this.limitCount,
      remaining: this.limitCount - current.count,
      reset: current.resetAt,
    };
  }
}

// ---------------------------------------------------------------------------
// Shared interface
// ---------------------------------------------------------------------------
export interface RateLimiter {
  limit: (identifier: string) => Promise<{
    success: boolean;
    limit: number;
    remaining: number;
    reset: number;
  }>;
}

// ---------------------------------------------------------------------------
// Limiter instances
// ---------------------------------------------------------------------------
let loginRateLimiter: RateLimiter;
let apiRateLimiter: RateLimiter;
/** Tighter limiter for expensive operations (PDF generation, R2 upload). */
let invoiceRateLimiter: RateLimiter;
/** Tighter limiter for MFA operations and other sensitive auth actions. */
let mfaRateLimiter: RateLimiter;

if (redisUrl && redisToken) {
  const redis = new Redis({ url: redisUrl, token: redisToken });

  loginRateLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "15 m"),
    analytics: true,
    prefix: "rl:login",
  });

  apiRateLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(60, "1 m"),
    analytics: true,
    prefix: "rl:api",
  });

  invoiceRateLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 m"),
    analytics: true,
    prefix: "rl:invoice",
  });

  mfaRateLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "10 m"),
    analytics: true,
    prefix: "rl:mfa",
  });
} else {
  // Dev fallback: 5 login attempts per 15 mins, 60 API req/min, 5 invoice req/min
  loginRateLimiter = new InMemoryRateLimiter(5, 15 * 60 * 1000);
  apiRateLimiter = new InMemoryRateLimiter(60, 60 * 1000);
  invoiceRateLimiter = new InMemoryRateLimiter(5, 60 * 1000);
  mfaRateLimiter = new InMemoryRateLimiter(5, 10 * 60 * 1000);
}

// ---------------------------------------------------------------------------
// Helper for Server Actions
// ---------------------------------------------------------------------------

/**
 * Checks whether an identifier (typically `userId`) has exceeded the rate limit
 * for a given limiter.
 *
 * Returns `{ limited: false }` when the request is allowed, or
 * `{ limited: true, secondsLeft: N }` when it should be rejected.
 *
 * Usage in a Server Action:
 *   const check = await checkActionRateLimit(apiRateLimiter, session.user.id);
 *   if (check.limited) return { data: null, error: { code: "TOO_MANY_REQUESTS", message: `Retry in ${check.secondsLeft}s` } };
 */
export async function checkActionRateLimit(
  limiter: RateLimiter,
  identifier: string
): Promise<{ limited: false } | { limited: true; secondsLeft: number }> {
  try {
    const result = await limiter.limit(identifier);
    if (!result.success) {
      const secondsLeft = Math.max(1, Math.ceil((result.reset - Date.now()) / 1000));
      return { limited: true, secondsLeft };
    }
    return { limited: false };
  } catch (err) {
    // Fail open — rate limiter errors must not block legitimate requests.
    console.error("[RateLimit] checkActionRateLimit error:", err);
    return { limited: false };
  }
}

export { loginRateLimiter, apiRateLimiter, invoiceRateLimiter, mfaRateLimiter };
