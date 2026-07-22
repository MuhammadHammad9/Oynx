import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { getRequiredEnv } from "../env";
import * as schema from "./schema";

let dbInstance: ReturnType<typeof drizzle> | null = null;

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(target, prop) {
    if (!dbInstance) {
      const databaseUrl = getRequiredEnv("DATABASE_URL");
      const useSsl = !/localhost|127\.0\.0\.1|::1/i.test(databaseUrl);
      const sql = postgres(databaseUrl, {
        max: 10,
        ssl: useSsl ? "require" : false,
        idle_timeout: 20,
        connect_timeout: 10,
      });
      dbInstance = drizzle(sql, { schema });
    }
    return (dbInstance as any)[prop];
  }
});
