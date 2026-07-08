import { Inngest } from "inngest";

/**
 * Inngest client singleton.
 * Used by Server Actions and API routes to send events.
 */
export const inngest = new Inngest({ id: "onyx-portal" });
