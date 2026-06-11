import type { D1Database } from "@cloudflare/workers-types";

export interface Env {
	DB: D1Database;
	// Google Books Volumes API のキー。secret として `wrangler secret put` か
	// ローカルは `.dev.vars` で設定する（リポジトリには値を置かない）。
	GOOGLE_BOOKS_API_KEY: string;
}
