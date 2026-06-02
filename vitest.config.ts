import path from "node:path";
import {
	cloudflareTest,
	readD1Migrations,
} from "@cloudflare/vitest-pool-workers";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig(async () => {
	const migrations = await readD1Migrations(path.join(__dirname, "drizzle"));
	return {
		plugins: [
			tsconfigPaths(),
			cloudflareTest({
				miniflare: {
					compatibilityDate: "2024-11-01",
					compatibilityFlags: ["nodejs_compat"],
					d1Databases: { DB: "test-db" },
					bindings: { TEST_MIGRATIONS: migrations },
				},
			}),
		],
		test: {
			setupFiles: ["./test/apply-migrations.ts"],
		},
	};
});
