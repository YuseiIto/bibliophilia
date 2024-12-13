import type { WorkDraft, CatalogSourceType, CatalogingRule } from "./work";
import type { IdentifierDraft, Identifier } from "./identifier";
import type { AgentDraft } from "./agent";
import type { TitleDraft } from "./title";
import type { SubjectDraft } from "./subject";
import type { SeriesTitleDraft } from "./series-title";
import type { BibLanguageDraft } from "./language";
import type { TextWithId } from "./text-with-id";

export interface BibRecordDraft {
	work: WorkDraft;
	identifiers: IdentifierDraft[];
	agents: AgentDraft[];
	titles: TitleDraft[];
	subjects: SubjectDraft[];
	seriesTitles: SeriesTitleDraft[];
	languages: BibLanguageDraft[];
	prices: TextWithId[];
	extents: TextWithId[];
	abstracts: TextWithId[];
	descriptions: TextWithId[];
	dates: TextWithId[];
}

export interface BibRecord {
	id: string;
	preferred_title: string;
	preferred_title_transcription: string | null;
	catalog_source: string;
	catalog_source_type: string; // CatalogSourceTypeにしたい
	cataloging_rule: string | null; // CatalogingRuleにしたい
	thumbnail_url: string | null;
	preferred_volume: string | null;
	preferred_volume_title: string | null;
	preferred_volume_title_transcription: string | null;
	identifiers: Identifier[];
}
