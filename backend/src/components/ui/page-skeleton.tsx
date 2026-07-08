import { cn } from "@/lib/utils";

function SkeletonBlock({ className }: { className?: string }) {
  return <div className={cn("skeleton-shimmer rounded-lg", className)} aria-hidden="true" />;
}

export function PageSkeleton({ variant = "marketing" }: { variant?: "marketing" | "detail" | "portal" }) {
  if (variant === "detail") {
    return (
      <div className="min-h-[100dvh] pt-24" style={{ background: "var(--bg)", color: "var(--fg)" }}>
        <div className="mx-auto w-full max-w-7xl px-6">
          <SkeletonBlock className="mb-8 h-4 w-56" />
          <SkeletonBlock className="mb-5 h-16 w-full max-w-3xl" />
          <SkeletonBlock className="mb-10 h-5 w-full max-w-2xl" />
          <SkeletonBlock className="mb-16 h-[320px] w-full rounded-2xl" />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
            <div className="space-y-5">
              <SkeletonBlock className="h-8 w-64" />
              <SkeletonBlock className="h-5 w-full" />
              <SkeletonBlock className="h-5 w-11/12" />
              <SkeletonBlock className="h-5 w-3/4" />
            </div>
            <SkeletonBlock className="h-72 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "portal") {
    return (
      <div className="min-h-[100dvh] p-6" style={{ background: "var(--bg)", color: "var(--fg)" }}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          <SkeletonBlock className="h-[calc(100dvh-48px)] rounded-2xl" />
          <div className="space-y-6">
            <SkeletonBlock className="h-20 rounded-2xl" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <SkeletonBlock className="h-32 rounded-2xl" />
              <SkeletonBlock className="h-32 rounded-2xl" />
              <SkeletonBlock className="h-32 rounded-2xl" />
            </div>
            <SkeletonBlock className="h-96 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] pt-24" style={{ background: "var(--bg)", color: "var(--fg)" }}>
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mx-auto mb-20 max-w-4xl text-center">
          <SkeletonBlock className="mx-auto mb-6 h-7 w-40 rounded-full" />
          <SkeletonBlock className="mx-auto mb-4 h-14 w-full max-w-3xl" />
          <SkeletonBlock className="mx-auto mb-8 h-14 w-full max-w-2xl" />
          <SkeletonBlock className="mx-auto h-5 w-full max-w-xl" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <SkeletonBlock className="h-[360px] rounded-2xl" />
          <SkeletonBlock className="h-[360px] rounded-2xl" />
          <SkeletonBlock className="h-[360px] rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
