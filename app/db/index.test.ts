import { expect, test, describe, beforeEach } from "vitest";
import {
	createTestRepository,
	sampleBibRecordDraft,
	clearTestDatabase,
} from "./test-helpers";

describe("getAllBibRecordSummaries", () => {
	beforeEach(clearTestDatabase);

	test("空 DB では [] を返す", async () => {
		const repo = createTestRepository();
		expect(await repo.getAllBibRecordSummaries()).toEqual([]);
	});

	test("登録したレコードをサマリで返す", async () => {
		const repo = createTestRepository();
		await repo.insertBibRecord(sampleBibRecordDraft());
		const summaries = await repo.getAllBibRecordSummaries();
		expect(summaries).toHaveLength(1);
		const s = summaries[0];
		expect(s.preferred_title).toBe("プログラミングTypeScript");
		expect(s.identifiers[0].identifier).toBe("978-4-87311-911-3");
		expect(s.agents).toEqual([{ preferred_name: "Boris Cherny", role: "著者" }]);
		expect(s.dates).toEqual(["2020"]);
	});

	test("preferred_title 昇順で返す", async () => {
		const repo = createTestRepository();
		await repo.insertBibRecord(sampleBibRecordDraft({ title: "B の本", isbn: "1" }));
		await repo.insertBibRecord(sampleBibRecordDraft({ title: "A の本", isbn: "2" }));
		const titles = (await repo.getAllBibRecordSummaries()).map(
			(s) => s.preferred_title,
		);
		expect(titles).toEqual(["A の本", "B の本"]);
	});
});

describe("simpleSearchBibRecords", () => {
	beforeEach(clearTestDatabase);

	test("タイトル部分一致でヒット", async () => {
		const repo = createTestRepository();
		await repo.insertBibRecord(sampleBibRecordDraft({ title: "プログラミングTypeScript", isbn: "1" }));
		await repo.insertBibRecord(sampleBibRecordDraft({ title: "吾輩は猫である", isbn: "2", authorName: "夏目漱石", subjectLabel: "小説" }));
		const hits = await repo.simpleSearchBibRecords("TypeScript");
		expect(hits.map((h) => h.preferred_title)).toEqual(["プログラミングTypeScript"]);
	});

	test("関与者名でヒット", async () => {
		const repo = createTestRepository();
		await repo.insertBibRecord(sampleBibRecordDraft({ title: "吾輩は猫である", isbn: "1", authorName: "夏目漱石", subjectLabel: "小説" }));
		const hits = await repo.simpleSearchBibRecords("漱石");
		expect(hits.map((h) => h.preferred_title)).toEqual(["吾輩は猫である"]);
	});

	test("件名でヒット", async () => {
		const repo = createTestRepository();
		await repo.insertBibRecord(sampleBibRecordDraft({ title: "何かの本", isbn: "1", subjectLabel: "情報科学" }));
		const hits = await repo.simpleSearchBibRecords("情報科学");
		expect(hits).toHaveLength(1);
	});

	test("ヒット 0 件では []", async () => {
		const repo = createTestRepository();
		await repo.insertBibRecord(sampleBibRecordDraft());
		expect(await repo.simpleSearchBibRecords("該当なしのはず")).toEqual([]);
	});

	test("複数フィールドに一致しても 1 件に重複排除される", async () => {
		const repo = createTestRepository();
		await repo.insertBibRecord(sampleBibRecordDraft({ title: "テスト駆動開発", isbn: "1", subjectLabel: "テスト" }));
		const hits = await repo.simpleSearchBibRecords("テスト");
		expect(hits).toHaveLength(1);
	});

	test("シリーズタイトルでヒット", async () => {
		const repo = createTestRepository();
		await repo.insertBibRecord(sampleBibRecordDraft({ title: "第1巻", isbn: "1", seriesTitle: "大河シリーズ" }));
		const hits = await repo.simpleSearchBibRecords("大河");
		expect(hits.map((h) => h.preferred_title)).toEqual(["第1巻"]);
	});
});

describe("getBibRecordDetail", () => {
	beforeEach(clearTestDatabase);

	test("存在しない id では null", async () => {
		const repo = createTestRepository();
		expect(await repo.getBibRecordDetail("nope")).toBeNull();
	});

	test("登録レコードの全関連を取得", async () => {
		const repo = createTestRepository();
		await repo.insertBibRecord(sampleBibRecordDraft({ seriesTitle: "オライリーの本" }));
		const id = (await repo.getAllBibRecordSummaries())[0].id;

		const d = await repo.getBibRecordDetail(id);
		expect(d).not.toBeNull();
		if (!d) return;
		expect(d.preferred_title).toBe("プログラミングTypeScript");
		expect(d.catalog_source_type).toBe("auto:ndl");
		expect(d.identifiers[0].identifier).toBe("978-4-87311-911-3");
		expect(d.agents[0]).toMatchObject({ preferred_name: "Boris Cherny", role: "著者", raw: "Boris Cherny 著" });
		expect(d.subjects[0].preferred_label).toBe("TypeScript");
		expect(d.seriesTitles[0].title).toBe("オライリーの本");
		expect(d.titles).toEqual([]);
		expect(d.abstracts).toEqual([]);
		expect(d.descriptions).toEqual([]);
		expect(d.languages).toEqual(["ja"]);
		expect(d.prices).toEqual(["￥3,520"]);
		expect(d.extents).toEqual(["408p ; 24cm"]);
		expect(d.dates).toEqual(["2020"]);
	});
});
