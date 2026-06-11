import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import type { LoaderFunctionArgs } from "react-router";
// app/routes 配下に置くと flatRoutes がルートとして拾うため、ローダーの単体テストは
// ルートディレクトリの外に置く。
import { loader } from "~/routes/api.cover";

type Args = LoaderFunctionArgs;

function callLoader(
	isbn: string | null,
	env: { GOOGLE_BOOKS_API_KEY?: string } = {},
): Promise<Response> {
	const url =
		isbn === null
			? "https://example.com/api/cover"
			: `https://example.com/api/cover?isbn=${encodeURIComponent(isbn)}`;
	const args = {
		request: new Request(url),
		context: { cloudflare: { env } },
		params: {},
	} as unknown as Args;
	return loader(args) as Promise<Response>;
}

function volumesResponse(imageLinks?: Record<string, string>): Response {
	const items = imageLinks ? [{ volumeInfo: { imageLinks } }] : [];
	return new Response(JSON.stringify({ items }), { status: 200 });
}

describe("api.cover loader", () => {
	let warnSpy: ReturnType<typeof vi.spyOn>;
	let errorSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		// 失敗系で出る warn/error をテスト出力に混ぜない。参照を保持して検証に使う。
		warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
		errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
	});
	afterEach(() => {
		vi.unstubAllGlobals();
		vi.restoreAllMocks();
	});

	test("imageLinks があれば大きいサイズへ 302、Cache-Control 付き", async () => {
		const fetchMock = vi.fn().mockResolvedValue(
			volumesResponse({
				smallThumbnail: "https://books.google.com/small.jpg",
				thumbnail: "https://books.google.com/thumb.jpg",
			}),
		);
		vi.stubGlobal("fetch", fetchMock);

		const res = await callLoader("978-4-87311-904-5");

		expect(res.status).toBe(302);
		expect(res.headers.get("Location")).toBe(
			"https://books.google.com/thumb.jpg",
		);
		expect(res.headers.get("Cache-Control")).toBe("public, max-age=86400");
		// 正規化された ISBN で問い合わせる (: は %3A に符号化される)。
		expect(String(fetchMock.mock.calls[0][0])).toContain(
			"q=isbn%3A9784873119045",
		);
	});

	test("extraLarge があれば最優先で選ぶ", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue(
				volumesResponse({
					thumbnail: "https://x/t.jpg",
					extraLarge: "https://x/xl.jpg",
				}),
			),
		);
		const res = await callLoader("1");
		expect(res.headers.get("Location")).toBe("https://x/xl.jpg");
	});

	test("http の画像 URL は https に昇格", async () => {
		vi.stubGlobal(
			"fetch",
			vi
				.fn()
				.mockResolvedValue(
					volumesResponse({ thumbnail: "http://books.google.com/t.jpg" }),
				),
		);
		const res = await callLoader("1");
		expect(res.headers.get("Location")).toBe("https://books.google.com/t.jpg");
	});

	test("API キーがあれば key を付与する", async () => {
		const fetchMock = vi
			.fn()
			.mockResolvedValue(volumesResponse({ thumbnail: "https://x/t.jpg" }));
		vi.stubGlobal("fetch", fetchMock);
		await callLoader("1", { GOOGLE_BOOKS_API_KEY: "secret" });
		expect(String(fetchMock.mock.calls[0][0])).toContain("key=secret");
	});

	test("isbn が無ければ fetch せず 404", async () => {
		const fetchMock = vi.fn();
		vi.stubGlobal("fetch", fetchMock);
		const res = await callLoader(null);
		expect(res.status).toBe(404);
		expect(fetchMock).not.toHaveBeenCalled();
	});

	test("上流が非 2xx なら 404 を返し警告する", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue(new Response("", { status: 429 })),
		);
		const res = await callLoader("1");
		expect(res.status).toBe(404);
		expect(warnSpy).toHaveBeenCalled();
	});

	test("fetch が throw しても 404 を返しエラーを残す", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockRejectedValue(new Error("network down")),
		);
		const res = await callLoader("1");
		expect(res.status).toBe(404);
		expect(errorSpy).toHaveBeenCalled();
	});

	test("imageLinks が無ければ 404 (これは正当なので無言)", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue(volumesResponse(undefined)),
		);
		const res = await callLoader("1");
		expect(res.status).toBe(404);
	});
});
