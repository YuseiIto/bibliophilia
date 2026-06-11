import { expect, test, describe } from "vitest";
import { coverUrlFromIdentifiers } from "./cover";

describe("coverUrlFromIdentifiers", () => {
	test("ISBN があれば書影プロキシ URL を返す(ハイフン除去)", () => {
		expect(
			coverUrlFromIdentifiers([
				{
					identifier: "978-4-87311-911-3",
					identifier_type: "http://ndl.go.jp/dcndl/terms/ISBN",
				},
			]),
		).toBe("/api/cover?isbn=9784873119113");
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
