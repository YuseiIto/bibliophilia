import { drizzle } from "drizzle-orm/d1";
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
} from "./schema";

import type { WorkDraft } from "~/model/work";
import type { IdentifierDraft } from "~/model/identifier";
import type { AgentDraft } from "~/model/agent";
import type { TitleDraft } from "~/model/title";
import type { SubjectDraft } from "~/model/subject";
import type { SeriesTitleDraft } from "~/model/series-title";
import type { BibLanguageDraft } from "~/model/language";
import type { TextWithId } from "~/model/text-with-id";

import { v4 as uuidv4 } from "uuid";

export class Repository {
	private _con;

	constructor(env: Env) {
		if (!env.DB) throw new Error("DB is not defined");
		this._con = drizzle(env.DB);
	}

	async insertWork(draft: WorkDraft) {
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
	}

	async insertIdentifier(draft: IdentifierDraft) {
		if (!draft.identifier) throw new Error("identifier is required");
		if (!draft.identifier_type) throw new Error("identifier_type is required");
		if (!draft.work_id) throw new Error("work_id is required");

		const identifier = {
			id: uuidv4(),
			work_id: draft.work_id,
			identifier: draft.identifier,
			identifier_type: draft.identifier_type,
		};

		await this._con.insert(bibIdentifiersTable).values(identifier);
	}

	async insertAgent(draft: AgentDraft) {
		if (!draft.preferredName) throw new Error("name is required");
		const agent = {
			id: uuidv4(),
			preferred_name: draft.preferredName,
			preferred_name_transcription: draft.preferredNameTranscription,
			agent_type: draft.agentKind,
		};

		await this._con.insert(bibAgentTable).values(agent);

		switch (draft.agentKind) {
			case "person":
				const person = {
					id: uuidv4(),
					agent_id: agent.id,
					preferred_name: draft.preferredName,
					preferred_name_transcription: draft.preferredNameTranscription,
				};
				await this._con.insert(bibPersonsTable).values(person);
				break;
			case "collective_agent":
				const collective = {
					id: uuidv4(),
					agent_id: agent.id,
					preferred_name: draft.preferredName,
					preferred_name_transcription: draft.preferredNameTranscription,
				};
				await this._con.insert(bibCollectiveAgentsTable).values(collective);
		}
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
}
