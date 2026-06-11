import { redirect, type LoaderFunctionArgs } from "react-router";

// Google Books の imageLinks。大きいサイズほど望ましいが、多くの本は
// thumbnail / smallThumbnail しか持たない。
type ImageLinks = Partial<
	Record<
		| "extraLarge"
		| "large"
		| "medium"
		| "small"
		| "thumbnail"
		| "smallThumbnail",
		string
	>
>;

const PREFERRED_SIZES: (keyof ImageLinks)[] = [
	"extraLarge",
	"large",
	"medium",
	"small",
	"thumbnail",
	"smallThumbnail",
];

const NOT_FOUND = new Response(null, { status: 404 });

// ISBN→画像URLはvolume IDベースで決定的に組めないため、サーバ側でVolumes APIを
// 1回引いて書影へ302で飛ばすプロキシ。書影が無ければ404を返し、<BookCover>の
// onErrorでプレースホルダにフォールバックさせる。
export async function loader({ context, request }: LoaderFunctionArgs) {
	// ハイフン等を除去し、ISBNとして妥当な文字(数字とX)だけ残す。
	const isbn = new URL(request.url).searchParams
		.get("isbn")
		?.replace(/[^0-9Xx]/g, "")
		.toUpperCase();
	if (!isbn) return NOT_FOUND;

	const apiUrl = new URL("https://www.googleapis.com/books/v1/volumes");
	apiUrl.searchParams.set("q", `isbn:${isbn}`);
	const apiKey = context.cloudflare.env.GOOGLE_BOOKS_API_KEY;
	if (apiKey) apiUrl.searchParams.set("key", apiKey);

	const res = await fetch(apiUrl).catch(() => null);
	if (!res?.ok) return NOT_FOUND;

	const json = (await res.json().catch(() => null)) as {
		items?: { volumeInfo?: { imageLinks?: ImageLinks } }[];
	} | null;
	const imageLinks = json?.items?.[0]?.volumeInfo?.imageLinks;
	if (!imageLinks) return NOT_FOUND;

	const imageUrl = PREFERRED_SIZES.map((size) => imageLinks[size]).find(
		Boolean,
	);
	if (!imageUrl) return NOT_FOUND;

	// Volumes APIのクォータを再消費しないよう、CDN/ブラウザにこのリダイレクトを
	// キャッシュさせる。imageLinksはhttpで返ることがあるためhttpsへ昇格。
	return redirect(imageUrl.replace(/^http:/, "https:"), {
		headers: { "Cache-Control": "public, max-age=86400" },
	});
}
