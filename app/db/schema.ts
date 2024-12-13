import { sqliteTable, text } from "drizzle-orm/sqlite-core";

/*
 * DBスキーマの定義.
 * 物理的にはCloudflare D1のSQLiteにデプロイされる。
 * 論理的なスキーマの設計にあたっては、IFRA LRM (https://repository.ifla.org/handle/20.500.14598/40) を参考に、
 * 実装のコストを考慮して設計する。
 */

/*
 * 語彙の方針
 * preferred_* : 優先名称(統一名称)
 * alternative_* : 別名称
 */

/*
 * Work: 著作
 * - LRM E2 (Work) に将来的に対応することを念頭に設計
 * - NOTE: LRMであればExpressionやManifestationの階層関係が必要だが、実装の簡略化のため一旦省略し、
 *   ExpressionやManifestationの情報はWorkに押し込む
 */
export const bibWorksTable = sqliteTable("bib_works", {
	id: text().primaryKey(),
	preferred_title: text().notNull(),
	preferred_title_transcription: text(),
	catalog_source: text().notNull(),
	catalog_source_type: text().notNull(), // NDL, JACO, CiNii, etc.
	cataloging_rule: text(), // NCR, RDA etc.
	thumbnail_url: text(),
	preferred_volume: text(),
	preferred_volume_title: text(),
	preferred_volume_title_transcription: text(),
});

export const bibIdentifiersTable = sqliteTable("bib_identifiers", {
	id: text().primaryKey(),
	work_id: text()
		.notNull()
		.references(() => bibWorksTable.id),
	identifier: text().notNull(),
	identifier_type: text().notNull(), // ISBN, ISSN, JPNO, etc.
});

/*
 * Item: 個別資料
 * - LRM E5 (Item) に将来的に対応することを念頭に設計
 */
export const bibItemsTable = sqliteTable("bib_items", {
	id: text().primaryKey(),
	work_id: text()
		.notNull()
		.references(() => bibWorksTable.id),
});

/*
 * Agent: agent
 * - 将来的にLRM-E6に対応する存在になる
 */
export const bibAgentTable = sqliteTable("bib_agents", {
	id: text().primaryKey(), // uuid
	preferred_name: text().notNull(), // 統一名称
	preferred_name_transcription: text(),
	agent_type: text().notNull(), // `person` or `collective`
});

/*
 * Person: 個人
 * - LRM E7 (Person) に将来的に対応することを念頭に設計
 * - Agent authorityと1-1対応
 * - NOTE: 将来的には人名の別名にも対応すべきだが、一旦省略
 */
export const bibPersonsTable = sqliteTable("bib_persons", {
	id: text().primaryKey(),
	agent_id: text()
		.notNull()
		.references(() => bibAgentTable.id),
	preferred_name: text().notNull(),
	preferred_name_transcription: text(),
});

/*
 * Collective Agent: 集団, 組織
 * - Agent authorityと1-1対応
 * - 将来的にLRM-E8となることを念頭に設計
 * - NOTE: 将来的には集団の別名にも対応すべきだが、一旦省略
 */
export const bibCollectiveAgentsTable = sqliteTable("bib_collective_agents", {
	id: text().primaryKey(),
	agent_id: text()
		.notNull()
		.references(() => bibAgentTable.id),
	preferred_name: text().notNull(),
	preferred_name_transcription: text(),
});

export const bibWorkAgentsTable = sqliteTable("bib_work_agencies", {
	work_id: text()
		.notNull()
		.references(() => bibWorksTable.id),
	agent_id: text()
		.notNull()
		.references(() => bibAgentTable.id),
	role: text().notNull(), // author,publisher, editor, translator, contributor, supervisor ...
	raw: text().notNull(), // 根拠となった記述
});

// 並列タイトル, 別タイトル
export const bibWorkTitlesTable = sqliteTable("bib_alternative_title", {
	id: text().primaryKey(),
	work_id: text()
		.notNull()
		.references(() => bibWorksTable.id),
	title: text().notNull(),
	transcription: text(),
});

// 件名標目
export const bibSubjectsTable = sqliteTable("bib_subjects", {
	id: text().primaryKey(),
	subject_type: text().notNull(),
	preferred_label: text().notNull(),
	preferred_label_transcription: text(),
});

export const bibWorksSubjectsTable = sqliteTable("bib_works_subjects", {
	id: text().primaryKey(),
	work_id: text()
		.notNull()
		.references(() => bibWorksTable.id),
	subject_id: text()
		.notNull()
		.references(() => bibSubjectsTable.id),
});

export const bibSeriesTitleTable = sqliteTable("bib_series_title", {
	id: text().primaryKey(),
	work_id: text()
		.notNull()
		.references(() => bibWorksTable.id),
	title: text().notNull(),
	transcription: text(),
});

export const bibLanguagesTable = sqliteTable("bib_languages", {
	id: text().primaryKey(),
	work_id: text()
		.notNull()
		.references(() => bibWorksTable.id),
	language: text().notNull(), // IETF BCP47に従う
});

export const bibOriginalLanguagesTable = sqliteTable("bib_original_languages", {
	id: text().primaryKey(),
	language: text().notNull(),
});

export const bibPriceTable = sqliteTable("bib_price", {
	id: text().primaryKey(),
	work_id: text()
		.notNull()
		.references(() => bibWorksTable.id),
	price: text().notNull(),
});

export const bibExtentTable = sqliteTable("bib_extent", {
	id: text().primaryKey(),
	work_id: text()
		.notNull()
		.references(() => bibWorksTable.id),
	extent: text().notNull(),
});

export const bibAbstractTable = sqliteTable("bib_abstract", {
	id: text().primaryKey(),
	work_id: text()
		.notNull()
		.references(() => bibWorksTable.id),
	abstract: text().notNull(),
});

export const bibDescriptionTable = sqliteTable("bib_description", {
	id: text().primaryKey(),
	work_id: text()
		.notNull()
		.references(() => bibWorksTable.id),
	description: text().notNull(),
});

export const bibDatesTable = sqliteTable("bib_dates", {
	id: text().primaryKey(),
	work_id: text()
		.notNull()
		.references(() => bibWorksTable.id),
	date: text().notNull(),
});
