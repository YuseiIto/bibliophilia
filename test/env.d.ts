/// <reference path="../node_modules/@cloudflare/vitest-pool-workers/types/cloudflare-test.d.ts" />

declare module "cloudflare:test" {
	interface ProvidedEnv {
		DB: D1Database;
		TEST_MIGRATIONS: D1Migration[];
	}
}

// `import { env } from "cloudflare:workers"` is typed against the worker's
// generated `Cloudflare.Env`, not `cloudflare:test`'s `ProvidedEnv`, so the
// test-only migrations binding must be augmented here too.
declare namespace Cloudflare {
	interface Env {
		TEST_MIGRATIONS: D1Migration[];
	}
}
