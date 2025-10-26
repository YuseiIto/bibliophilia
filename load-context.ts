import { type PlatformProxy } from "wrangler";
import type { Env } from "~/cloudflare";

// When using `wrangler.toml` to configure bindings,
// `wrangler types` will generate types for those bindings
// into the global `Env` interface.
// even if no `wrangler.toml` exists.

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

declare module "react-router" {
	interface AppLoadContext {
		cloudflare: Cloudflare;
	}
}

export {}; // necessary for TS to treat this as a module
