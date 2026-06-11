export const ISBN_IDENTIFIER_TYPE = "http://ndl.go.jp/dcndl/terms/ISBN";

// ハイフン等の区切りを除き、ISBN として妥当な文字 (数字と末尾チェックディジット X)
// だけを残して正規化する。書影プロキシのクエリ生成とサーバ側受け口の両方で使い、
// 正規化のされ方を一致させる。
export function normalizeIsbn(raw: string): string {
	return raw.replace(/[^0-9Xx]/g, "").toUpperCase();
}

export function coverUrlFromIdentifiers(
	identifiers: { identifier: string; identifier_type: string }[],
): string | null {
	const isbn = identifiers.find(
		(i) => i.identifier_type === ISBN_IDENTIFIER_TYPE,
	)?.identifier;
	if (!isbn) return null;
	const normalized = normalizeIsbn(isbn);
	if (!normalized) return null;
	return `/api/cover?isbn=${normalized}`;
}
