export type CatalogSourceType =
	| "auto:ndl" // NDLから自動取得
	| "manual:original" // 出典なし(新規作成)
	| "manual:other"; // その他

export const isCatalogSourceType = (value: any): value is CatalogSourceType =>
	["auto:ndl", "manual:original", "manual:other"].includes(value);

export type CatalogingRule =
	| "ncr/2018"
	| "ncr/1987"
	| "ncr/1977"
	| "ncr"
	| "ndlserial"
	| "rda"
	| "aacr";

export const isCatalogingRule = (value: any): value is CatalogingRule =>
	[
		"ncr/2018",
		"ncr/1987",
		"ncr/1977",
		"ncr",
		"ndlserial",
		"rda",
		"aacr",
	].includes(value);

export interface Work {
	id: string;
	preferred_title: string;
	preferred_title_transcription?: string;
	catalog_source: string;
	catalog_source_type: CatalogSourceType;
	cataloging_rule?: CatalogingRule;
	thumbnail_url?: string;
	preferred_volume?: string;
	preferred_volume_title?: string;
	preferred_volume_title_transcription?: string;
}

export interface WorkDraft {
	id: string;
	preferred_title: string | null;
	preferred_title_transcription: string | null;
	catalog_source: string | null;
	catalog_source_type: CatalogSourceType | null;
	cataloging_rule: CatalogingRule | null;
	thumbnail_url: string | null;
	preferred_volume: string | null;
	preferred_volume_title: string | null;
	preferred_volume_title_transcription: string | null;
}

export const isValidWork = (value: WorkDraft) => {
	if (!value.preferred_title) return false;
	if (!isCatalogSourceType(value.catalog_source_type)) return false;
	if (value.catalog_source_type === "manual:original") {
		if (
			!isCatalogingRule(value.cataloging_rule) &&
			value.cataloging_rule != null
		)
			return false;
	}

	return true;
};
