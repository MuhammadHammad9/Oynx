import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import { onMessageSent } from "@/lib/inngest/functions/on-message-sent";

/**
 * Inngest serve handler — registers all background functions with the Inngest platform.
 * Exposed at /api/inngest for the Inngest cloud to communicate with.
 */
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [onMessageSent],
});
