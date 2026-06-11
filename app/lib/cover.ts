export const ISBN_IDENTIFIER_TYPE = "http://ndl.go.jp/dcndl/terms/ISBN";

export function coverUrlFromIdentifiers(
	identifiers: { identifier: string; identifier_type: string }[],
): string | null {
	const isbn = identifiers.find(
		(i) => i.identifier_type === ISBN_IDENTIFIER_TYPE,
	)?.identifier;
	if (!isbn) return null;
	return `/api/cover?isbn=${isbn.replaceAll("-", "")}`;
}
