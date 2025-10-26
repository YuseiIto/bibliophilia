import { reactRouter } from "@react-router/dev/vite";
import { cloudflareDevProxy } from "@react-router/dev/vite/cloudflare";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/cloudflare" {
	interface Future {
		v3_singleFetch: true;
	}
}

export default defineConfig({
	plugins: [cloudflareDevProxy(), reactRouter(), tsconfigPaths()],
});
