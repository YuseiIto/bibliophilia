export type CatalogSourceType =
	| "auto:ndl" // NDLから自動取得
	| "manual:original" // 出典なし(新規作成)
	| "manual:other"; // その他

export const isCatalogSourceType = (value: any): value is CatalogSourceType =>
	["auto:ndl", "manual:original","manual:other"].includes(value);

export type CatalogingRule =
	| "ncr/2018"
	| "ncr/1987"
	| "ncr/1977"
	| "ndlserial"
	| "rda"
	| "aacr";

export const isCatalogingRule = (value: any): value is CatalogingRule =>
	["ncr/2018", "ncr/1987", "ncr/1977", "ndlserial", "rda", "aacr"].includes(
		value,
	);

export type Work = {
	id: string;
	preferred_title: string;
	preferred_title_transcription?: string;
	catalog_source: string;
	catalog_source_type: CatalogSourceType;
	cataloging_rule?: string;
	thumbnail_url?: string;
	preferred_volume?: string;
	preferred_volume_title?: string;
	preferred_volume_title_transcription?: string;
};
