import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";
import {
	bibWorksTable,
	bibIdentifiersTable,
	bibAgentTable,
	bibPersonsTable,
	bibCollectiveAgentsTable,
	bibWorkTitlesTable,
	bibSubjectsTable,
	bibWorksSubjectsTable,
	bibSeriesTitleTable,
	bibLanguagesTable,
	bibPriceTable,
	bibExtentTable,
	bibAbstractTable,
	bibDescriptionTable,
	bibDatesTable,
	bibItemsTable,
	bibWorkAgentsTable,
} from "./schema";
import type { WorkDraft, Work } from "~/model/work";
import type { IdentifierDraft, Identifier } from "~/model/identifier";
import type { AgentDraft } from "~/model/agent";
import type { TitleDraft } from "~/model/title";
import type { SubjectDraft } from "~/model/subject";
import type { SeriesTitleDraft } from "~/model/series-title";
import type { BibLanguageDraft } from "~/model/language";
import type { TextWithId } from "~/model/text-with-id";
import type { BibRecordDraft, BibRecord } from "~/model/bib-record";

import { v4 as uuidv4 } from "uuid";

export class Repository {
	private _con;

	constructor(env: Env) {
		if (!env.DB) throw new Error("DB is not defined");
		this._con = drizzle(env.DB, { schema });
	}

	async insertItem(workId: string): Promise<string> {
		const item = {
			id: uuidv4(),
			work_id: workId,
		};

		await this._con.insert(bibItemsTable).values(item);
		return item.id;
	}

	async insertWork(draft: WorkDraft): Promise<string> {
		if (!draft.preferred_title) throw new Error("preferred_title is required");
		if (!draft.catalog_source) throw new Error("catalog_source is required");
		if (!draft.catalog_source_type)
			throw new Error("catalog_source_type is required");

		const work = {
			id: uuidv4(),
			preferred_title: draft.preferred_title,
			preferred_title_transcription: draft.preferred_title_transcription,
			catalog_source: draft.catalog_source,
			catalog_source_type: draft.catalog_source_type,
			cataloging_rule: draft.cataloging_rule,
			thumbnail_url: "",
			preferred_volume: draft.preferred_volume,
			preferred_volume_title: draft.preferred_volume_title,
			preferred_volume_title_transcription:
				draft.preferred_volume_title_transcription,
		};

		await this._con.insert(bibWorksTable).values(work);

		return work.id;
	}

	async insertIdentifier(draft: IdentifierDraft, work_id: string) {
		if (!draft.identifier) throw new Error("identifier is required");
		if (!draft.identifier_type) throw new Error("identifier_type is required");
		if (!work_id) throw new Error("work_id is required");

		const identifier = {
			id: uuidv4(),
			work_id: work_id,
			identifier: draft.identifier,
			identifier_type: draft.identifier_type,
		};

		await this._con.insert(bibIdentifiersTable).values(identifier);
		return identifier.id;
	}

	async insertAgent(draft: AgentDraft): Promise<string> {
		if (!draft.preferredName) throw new Error("name is required");
		const agent = {
			id: uuidv4(),
			preferred_name: draft.preferredName,
			preferred_name_transcription: draft.preferredNameTranscription,
			agent_type: draft.agentKind,
		};

		await this._con.insert(bibAgentTable).values(agent);

		switch (draft.agentKind) {
			case "person": {
				const person = {
					id: uuidv4(),
					agent_id: agent.id,
					preferred_name: draft.preferredName,
					preferred_name_transcription: draft.preferredNameTranscription,
				};
				await this._con.insert(bibPersonsTable).values(person);
				break;
			}
			case "collective_agent": {
				const collective = {
					id: uuidv4(),
					agent_id: agent.id,
					preferred_name: draft.preferredName,
					preferred_name_transcription: draft.preferredNameTranscription,
				};
				await this._con.insert(bibCollectiveAgentsTable).values(collective);
			}
		}

		return agent.id;
	}

	async insertWorkAgent(
		work_id: string,
		agent_id: string,
		role: string,
		raw: string,
	) {
		const workAgent = {
			work_id,
			agent_id,
			role,
			raw,
		};

		await this._con.insert(bibWorkAgentsTable).values(workAgent);
	}

	async insertTitles(draft: TitleDraft, work_id: string) {
		if (!draft.title) throw new Error("title is required");

		const title = {
			id: uuidv4(),
			work_id: work_id,
			title: draft.title,
			title_transcription: draft.transcription,
		};

		await this._con.insert(bibWorkTitlesTable).values(title);
	}

	async insertSubject(draft: SubjectDraft, work_id: string) {
		const subject = {
			id: uuidv4(),
			subject_type: draft.subject_type,
			preferred_label: draft.preferred_label,
			preferred_label_transcription: draft.preferred_label_transcription,
		};

		await this._con.insert(bibSubjectsTable).values(subject);
		const workSubjects = {
			id: uuidv4(),
			work_id: work_id,
			subject_id: subject.id,
		};

		await this._con.insert(bibWorksSubjectsTable).values(workSubjects);
	}

	async insertSeriesTitle(draft: SeriesTitleDraft, work_id: string) {
		const seriesTitle = {
			id: uuidv4(),
			work_id: work_id,
			title: draft.title,
			transcription: draft.transcription,
		};

		await this._con.insert(bibSeriesTitleTable).values(seriesTitle);
	}

	async insertLanguage(draft: BibLanguageDraft, work_id: string) {
		const language = {
			id: uuidv4(),
			work_id,
			language: draft.language,
		};

		await this._con.insert(bibLanguagesTable).values(language);
	}

	async insertPrice(draft: TextWithId, work_id: string) {
		const price = {
			id: uuidv4(),
			work_id,
			price: draft.value,
		};

		await this._con.insert(bibPriceTable).values(price);
	}

	async insertExtent(draft: TextWithId, work_id: string) {
		const extent = {
			id: uuidv4(),
			work_id,
			extent: draft.value,
		};

		await this._con.insert(bibExtentTable).values(extent);
	}

	async insertAbstract(draft: TextWithId, work_id: string) {
		const abstract = {
			id: uuidv4(),
			work_id,
			abstract: draft.value,
		};

		await this._con.insert(bibAbstractTable).values(abstract);
	}

	async insertDescription(draft: TextWithId, work_id: string) {
		const description = {
			id: uuidv4(),
			work_id,
			description: draft.value,
		};

		await this._con.insert(bibDescriptionTable).values(description);
	}

	async insertDate(draft: TextWithId, work_id: string) {
		const date = {
			id: uuidv4(),
			work_id,
			date: draft.value,
		};

		await this._con.insert(bibDatesTable).values(date);
	}

	async insertBibRecord(draft: BibRecordDraft) {
		const {
			work,
			identifiers,
			agents,
			titles,
			subjects,
			seriesTitles,
			languages,
			prices,
			extents,
			abstracts,
			descriptions,
			dates,
		} = draft;

		const workId = await this.insertWork(work);
		for (const identifier of identifiers) {
			await this.insertIdentifier(identifier, workId);
		}

		for (const agent of agents) {
			const agentId = await this.insertAgent(agent);
			await this.insertWorkAgent(workId, agentId, agent.role, agent.raw);
		}

		for (const title of titles) {
			await this.insertTitles(title, workId);
		}

		for (const subject of subjects) {
			await this.insertSubject(subject, workId);
		}

		for (const seriesTitle of seriesTitles) {
			await this.insertSeriesTitle(seriesTitle, workId);
		}

		for (const language of languages) {
			await this.insertLanguage(language, workId);
		}

		for (const price of prices) {
			await this.insertPrice(price, workId);
		}

		for (const extent of extents) {
			await this.insertExtent(extent, workId);
		}

		for (const abstract of abstracts) {
			await this.insertAbstract(abstract, workId);
		}

		for (const description of descriptions) {
			await this.insertDescription(description, workId);
		}

		for (const date of dates) {
			await this.insertDate(date, workId);
		}

		await this.insertItem(workId);
	}

	async getAllBibRecords(): Promise<BibRecord[]> {
		return (await this._con.query.bibWorksTable.findMany({
			with: {
				identifiers: true,
			},
		})) as BibRecord[];
	}
}
