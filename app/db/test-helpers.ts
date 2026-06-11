import { drizzle } from "drizzle-orm/d1";
import { env } from "cloudflare:workers";
import * as schema from "./schema";
import { Repository } from "./index";
import type { BibRecordDraft } from "~/model/bib-record";

export function createTestRepository(): Repository {
	return new Repository(drizzle(env.DB, { schema }));
}

// The cloudflareTest plugin (0.16.x) isolates D1 storage per test FILE, not per
// test: writes from one test remain visible to the next within the same file.
// (The old defineWorkersConfig `isolatedStorage` per-test savepoints are not
// exposed by this plugin API.) So tests must reset state explicitly.
export async function clearTestDatabase(): Promise<void> {
	// MAINTENANCE: keep this in sync with schema.ts. A migration that adds a new
	// table must add it here (child-before-parent FK order), or tests will bleed
	// state across cases silently.
	const tables = [
		"bib_works_subjects",
		"bib_work_agencies",
		"bib_alternative_title",
		"bib_subjects",
		"bib_series_title",
		"bib_languages",
		"bib_original_languages",
		"bib_price",
		"bib_extent",
		"bib_abstract",
		"bib_description",
		"bib_dates",
		"bib_identifiers",
		"bib_items",
		"bib_persons",
		"bib_collective_agents",
		"bib_agents",
		"bib_works",
	];
	for (const table of tables) {
		await env.DB.prepare(`DELETE FROM ${table}`).run();
	}
}

export function sampleBibRecordDraft(
	overrides: Partial<{
		title: string;
		titleTranscription: string;
		authorName: string;
		// 同一資料に複数著者を持たせたいとき (authorName より優先)。[] で著者なし。
		authorNames: string[];
		isbn: string;
		subjectLabel: string;
		// 同一資料に複数件名を持たせたいとき (subjectLabel より優先)。[] で件名なし。
		subjectLabels: string[];
		seriesTitle: string;
		date: string;
	}> = {},
): BibRecordDraft {
	const {
		title = "プログラミングTypeScript",
		titleTranscription = "ぷろぐらみんぐTypeScript",
		authorName = "Boris Cherny",
		isbn = "978-4-87311-904-5",
		subjectLabel = "TypeScript",
		seriesTitle = "",
		date = "2020",
	} = overrides;
	const authorNames = overrides.authorNames ?? [authorName];
	const subjectLabels = overrides.subjectLabels ?? [subjectLabel];
	return {
		work: {
			id: null,
			preferred_title: title,
			preferred_title_transcription: titleTranscription,
			catalog_source: "NDL",
			catalog_source_type: "auto:ndl",
			cataloging_rule: "ncr",
			thumbnail_url: null,
			preferred_volume: null,
			preferred_volume_title: null,
			preferred_volume_title_transcription: null,
		},
		identifiers: [
			{
				id: null,
				work_id: null,
				identifier: isbn,
				identifier_type: "http://ndl.go.jp/dcndl/terms/ISBN",
			},
		],
		agents: authorNames.map((name) => ({
			id: null,
			agentKind: "person",
			preferredName: name,
			preferredNameTranscription: "",
			role: "著者",
			raw: `${name} 著`,
		})),
		titles: [],
		subjects: subjectLabels.map((label) => ({
			id: null,
			subject_type: "http://id.ndl.go.jp/class/ndc10",
			preferred_label: label,
			preferred_label_transcription: "",
		})),
		seriesTitles: seriesTitle
			? [{ id: null, title: seriesTitle, transcription: "" }]
			: [],
		languages: [{ id: null, language: "ja" }],
		prices: [{ id: null, value: "￥3,520" }],
		extents: [{ id: null, value: "408p ; 24cm" }],
		abstracts: [],
		descriptions: [],
		dates: [{ id: null, value: date }],
	};
}
