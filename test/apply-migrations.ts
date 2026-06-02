import { applyD1Migrations } from "cloudflare:test";
import { env } from "cloudflare:workers";

// Setup files run outside per-test storage isolation and may run multiple times.
// applyD1Migrations only applies not-yet-applied migrations, so this is safe.
await applyD1Migrations(env.DB, env.TEST_MIGRATIONS);
