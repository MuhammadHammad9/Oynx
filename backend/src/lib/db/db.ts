import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { getRequiredEnv } from "../env";
import * as schema from "./schema";

const databaseUrl = getRequiredEnv("DATABASE_URL");
const useSsl = !/localhost|127\.0\.0\.1|::1/i.test(databaseUrl);

const sql = postgres(databaseUrl, {
  max: 10,
  ssl: useSsl ? "require" : false,
  idle_timeout: 20,
  connect_timeout: 10,
});

export const db = drizzle(sql, { schema });
