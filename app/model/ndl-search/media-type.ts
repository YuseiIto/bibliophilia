/*
 * NDL Search の OpenSearch APIで使えるメディアタイプ
 * 以下のURLにある仕様書を参考に実装
 * https://ndlsearch.ndl.go.jp/file/help/api/specifications/ndlsearch_api_ap2_20240401.pdf
 */

export type MediaType =
	| "books"
	| "periodicals"
	| "articles"
	| "newspapers"
	| "oldmaterials"
	| "maps"
	| "electronic"
	| "video"
	| "audio"
	| "online"
	| "doctoral"
	| "reports";
