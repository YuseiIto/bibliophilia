import { expect, test, describe } from "vitest";
import { coverUrlFromIdentifiers, normalizeIsbn } from "./cover";

describe("normalizeIsbn", () => {
	test("ハイフン等を除去する", () => {
		expect(normalizeIsbn("978-4-87311-904-5")).toBe("9784873119045");
	});

	test("末尾チェックディジット X は大文字で残す", () => {
		expect(normalizeIsbn("4-87311-904-x")).toBe("487311904X");
	});

	test("ISBN として妥当な文字が無ければ空文字", () => {
		expect(normalizeIsbn("---")).toBe("");
	});
});

describe("coverUrlFromIdentifiers", () => {
	test("ISBN があれば書影プロキシ URL を返す(ハイフン除去)", () => {
		expect(
			coverUrlFromIdentifiers([
				{
					identifier: "978-4-87311-904-5",
					identifier_type: "http://ndl.go.jp/dcndl/terms/ISBN",
				},
			]),
		).toBe("/api/cover?isbn=9784873119045");
	});

	test("チェックディジット X を含む ISBN も正規化される", () => {
		expect(
			coverUrlFromIdentifiers([
				{
					identifier: "4-87311-904-X",
					identifier_type: "http://ndl.go.jp/dcndl/terms/ISBN",
				},
			]),
		).toBe("/api/cover?isbn=487311904X");
	});

	test("ISBN が無ければ null", () => {
		expect(
			coverUrlFromIdentifiers([
				{
					identifier: "12345",
					identifier_type: "http://ndl.go.jp/dcndl/terms/ISSN",
				},
			]),
		).toBeNull();
	});

	test("識別子が空でも null(クラッシュしない)", () => {
		expect(coverUrlFromIdentifiers([])).toBeNull();
	});
});
