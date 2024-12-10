import type { WorkDraft } from "./work";
import type { Identifier } from "./identifier";
import type { AgentDraft } from "./agent";
import type { TitleDraft } from "./title";
import type { SubjectDraft } from "./subject";
import type { SeriesTitleDraft } from "./series-title";
import type { KnownLanguage } from "./language";

export interface BibRecordDraft {
	work: WorkDraft;
	identifiers: Identifier[];
	agents: AgentDraft[];
	titles: TitleDraft[];
	subjects: SubjectDraft[];
	seriesTitles: SeriesTitleDraft[];
	languages: (KnownLanguage | string)[];
	prices: string[];
	extents: string[];
	abstracts: string[];
	descriptions: string[];
	dates: string[];
}
