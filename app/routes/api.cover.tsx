import { redirect, type LoaderFunctionArgs } from "react-router";
import { normalizeIsbn } from "~/lib/cover";

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
	// クライアントの coverUrlFromIdentifiers でも正規化するが、この endpoint は
	// 任意の入力で直接叩けるため、同じ normalizeIsbn でサーバ側でも正規化する。
	const raw = new URL(request.url).searchParams.get("isbn");
	const isbn = raw ? normalizeIsbn(raw) : "";
	if (!isbn) return NOT_FOUND;

	const apiUrl = new URL("https://www.googleapis.com/books/v1/volumes");
	apiUrl.searchParams.set("q", `isbn:${isbn}`);
	const apiKey = context.cloudflare.env.GOOGLE_BOOKS_API_KEY;
	if (apiKey) {
		apiUrl.searchParams.set("key", apiKey);
	} else {
		// キー無しでも Volumes API は応答するが quota が厳しく、本番では 429 が
		// 連鎖して全書影が消えうる。設定漏れを検知できるよう警告する。
		console.warn("[cover] GOOGLE_BOOKS_API_KEY unset; using stricter quota");
	}

	// 書影が「無い」ことと「上流が失敗した」ことを区別する。前者は正当なので無言で
	// 404 (= placeholder) に落とすが、後者 (network/非2xx/壊れたJSON) はログに残す。
	let res: Response;
	try {
		res = await fetch(apiUrl);
	} catch (e) {
		console.error(`[cover] fetch failed isbn=${isbn}:`, e);
		return NOT_FOUND;
	}
	if (!res.ok) {
		console.warn(`[cover] Google Books ${res.status} isbn=${isbn}`);
		return NOT_FOUND;
	}

	let json: { items?: { volumeInfo?: { imageLinks?: ImageLinks } }[] } | null;
	try {
		json = (await res.json()) as typeof json;
	} catch (e) {
		console.warn(`[cover] invalid JSON isbn=${isbn}:`, e);
		return NOT_FOUND;
	}
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
