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
