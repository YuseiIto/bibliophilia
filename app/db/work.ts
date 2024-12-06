export type CatalogSourceType = "NDL";
export type CatalogingRule = "";

export interface Work {
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
}
