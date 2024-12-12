import { search } from "./sru";
import { And } from "./cql";
import { DcNdlParser } from "./dcndl";

import type { BibRecordDraft } from "~/model/bib-record";
import type { WorkDraft } from "~/model/work";
import type { IdentifierDraft } from "~/model/identifier";
import type { AgentDraft, AgentRole } from "~/model/agent";
import type { SubjectDraft } from "~/model/subject";
import type { SeriesTitleDraft } from "~/model/series-title";
import type { BibLanguageDraft } from "~/model/language";

import { bcp47Normalize } from "bcp-47-normalize";

const foafAgentToAgentDraft = (agent: any, role: AgentRole): AgentDraft => ({
	id: null,
	agentKind: "person", // 不明をどう扱うか?
	preferredName: agent.name,
	preferredNameTranscription: agent.transcription,
	role,
	raw: "",
});

export async function lookupByIsbn(isbn: string): Promise<BibRecordDraft> {
	const xml = await search({ query: And({ isbn }) });
	const parser = new DcNdlParser();
	await parser.parseXml(xml);

	const work: WorkDraft = {
		id: null,
		preferred_title: parser.dcTitle[0].value,
		preferred_title_transcription: parser.dcTitle[0].transcription,
		catalog_source: parser.bibAdminResource["@_rdf:about"],
		catalog_source_type: "auto:ndl",
		cataloging_rule: parser.catalogingRule,
		thumbnail_url: null, // URL入れる
		preferred_volume: parser.volume[0] ? parser.volume[0].value : null,
		preferred_volume_title: parser.volumeTitle[0]
			? parser.volumeTitle[0].value
			: null,
		preferred_volume_title_transcription: parser.volumeTitle[0]
			? parser.volumeTitle[0].transcription
			: null,
	};

	const identifiers: IdentifierDraft[] = parser.dctermsIdentifier.map(
		({ datatype, value }: { datatype: string; value: string }) => ({
			id: null,
			work_id: null,
			identifier_type: datatype,
			identifier: value,
		}),
	);

	const dcCreators = parser.dcCreator.map((x: string) => ({
		agentKind: "person", // 不明をどう扱うか?
		preferredName: x,
		preferredNameTranscription: "",
		role: "著者",
		raw: "",
	}));

	const dcTermsCreators = parser.dctermsCreator.map((x: any) =>
		foafAgentToAgentDraft(x, "著者"),
	);
	const dcTermsPublishers = parser.dctermsPublisher.map((x: any) =>
		foafAgentToAgentDraft(x, "出版者"),
	);
	const seriesCreators = parser.seriesCreator.map((x: any) =>
		foafAgentToAgentDraft(x, "シリーズ著者"),
	);
	const editionCreators = parser.editionCreator.map((x: any) =>
		foafAgentToAgentDraft(x, "版著者"),
	);
	const contributors: AgentDraft[] = parser.contributor.map((x: any) =>
		foafAgentToAgentDraft(x, "貢献者"),
	);

	const agents = [
		...dcCreators,
		...dcTermsCreators,
		...dcTermsPublishers,
		...seriesCreators,
		...editionCreators,
		...contributors,
	];

	const otherTitles = parser.dcTitle.map((x: any) => ({
		id: null,
		title: x.value,
		transcription: x.transcription,
	}));

	const alternativeTitles = parser.alternative.map((x: any) => ({
		title: x.value,
		transcription: x.transcription,
	}));

	const titles = [...otherTitles, ...alternativeTitles];

	const dctermsSubjects: SubjectDraft[] = parser.dctermsSubject.map(
		(x: any) => {
			if (x.value) {
				return {
					id: null,
					preferred_label: x.value,
					preferred_label_transcription: x.transcription ?? null,
					subject_type: "other",
				};
			} else {
				// DDCだけ `/分類番号/about` の形式になっているので /about を取り除く
				const resource = x.resource.replace("/about", "").split("/");

				return {
					id: null,
					preferred_label: resource[resource.length - 1],
					preferred_label_transcription: null,
					subject_type: resource.slice(0, -1).join("/"),
				};
			}
		},
	);

	const dcSubjects: SubjectDraft[] = parser.dcSubject.map((x: any) => ({
		preferred_label: x.value,
		preferred_label_transcription: null,
		subject_type: x.datatype,
	}));

	const subjects = [...dctermsSubjects, ...dcSubjects];

	const seriesTitles: SeriesTitleDraft[] = parser.seriesTitle.map((x: any) => ({
		title: x.value,
		transcription: x.transcription ?? null,
	}));

	const languages: BibLanguageDraft[] = parser.dctermsLanguage.map(
		(x: any) => ({
			id: null,
			language: bcp47Normalize(x.value),
		}),
	);

	const prices = parser.price.map((value: string) => ({ id: null, value }));
	const extents = parser.dctermsExtent.map((value: string) => ({
		id: null,
		value,
	}));
	const abstracts = parser.dctermsAbstract;
	const descriptions = parser.dctermsDescription;
	const dates = parser.dctermsDate.map((value: string) => ({
		id: null,
		value,
	}));

	return {
		work,
		identifiers,
		agents,
		titles,
		subjects,
		seriesTitles: seriesTitles,
		languages,
		prices,
		extents,
		abstracts,
		descriptions,
		dates,
	};
}
