import type { WorkDraft } from "./work";
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

export interface BibRecordSummary {
	id: string;
	preferred_title: string;
	preferred_title_transcription: string | null;
	thumbnail_url: string | null;
	identifiers: Identifier[];
	agents: { preferred_name: string; role: string }[];
	dates: string[];
}

export interface BibDetailAgent {
	preferred_name: string;
	preferred_name_transcription: string | null;
	role: string;
	raw: string;
}

export interface BibDetailSubject {
	subject_type: string;
	preferred_label: string;
	preferred_label_transcription: string | null;
}

export interface BibDetailTitle {
	title: string;
	transcription: string | null;
}

export interface BibRecordDetail {
	id: string;
	preferred_title: string;
	preferred_title_transcription: string | null;
	catalog_source: string;
	catalog_source_type: string;
	cataloging_rule: string | null;
	thumbnail_url: string | null;
	preferred_volume: string | null;
	preferred_volume_title: string | null;
	preferred_volume_title_transcription: string | null;
	identifiers: Identifier[];
	agents: BibDetailAgent[];
	titles: BibDetailTitle[];
	subjects: BibDetailSubject[];
	seriesTitles: BibDetailTitle[];
	languages: string[];
	prices: string[];
	extents: string[];
	abstracts: string[];
	descriptions: string[];
	dates: string[];
}
