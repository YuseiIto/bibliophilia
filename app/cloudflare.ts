import type { D1Database } from "@cloudflare/workers-types";

export interface Env {
	DB: D1Database;
	// Google Books Volumes API のキー。secret として `wrangler secret put` か
	// ローカルは `.dev.vars` で設定する（リポジトリには値を置かない）。未設定でも
	// 書影取得は厳しい quota で動作するため optional とし、欠落は実行時に警告する。
	GOOGLE_BOOKS_API_KEY?: string;
}
