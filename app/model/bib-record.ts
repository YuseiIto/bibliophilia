import type { WorkDraft } from "./work";
import type { IdentifierDraft } from "./identifier";
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
