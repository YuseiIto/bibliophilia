import { parseStringPromise } from "xml2js";

const NDL_OPENSEARCH_BASEURL = "https://ndlsearch.ndl.go.jp/api/opensearch";

type AllowMultiple<T> = T | T[];

/*
 * NDL Search の OpenSearch APIで使えるメディアタイプ
 * 以下のURLにある仕様書を参考に実装
 * https://ndlsearch.ndl.go.jp/file/help/api/specifications/ndlsearch_api_ap2_20240401.pdf
 */

type MediaType = "books" | "periodicals" | "articles" | "newspapers" | "oldmaterials" | "maps" | "electronic" | "video" | "audio" | "online" | "doctoral" | "reports";

/*
 * NDL Search の OpenSearch APIで使えるパラメータ
 * 以下のURLにある仕様書を参考に実装
 * https://ndlsearch.ndl.go.jp/file/help/api/specifications/ndlsearch_api_20240712.pdf
 */

interface OpenSearchParameters {
  dpid? :AllowMultiple<string>; // データプロバイダID, データグループID, コレクションコード, AccessRights
  dpgroupid?: string; // データプロバイダグループID
  any?: AllowMultiple<string>; // すべての項目を対象に検索
  title?: AllowMultiple<string>; // タイトル
  creator?: AllowMultiple<string>; // 作成者
  publisher?: AllowMultiple<string>; // 出版者
  digitizedPublisher?: AllowMultiple<string>; // デジタル化した製作者
  ndc?: string; // NDC, NDLC
  from?: string; // 開始出版年月日 (YYYY, YYYY-MM, YYYY-MM-DD)
  until?: string; // 終了出版年月日  (YYYY, YYYY-MM, YYYY-MM-DD)
  cnt?: number; // 取得件数
  idx?: number; // 取得開始位置
  isbn? : string;
  mediaType?: MediaType;
}



export function composeSearchUrl(params: OpenSearchParameters){
  const url = new URL(NDL_OPENSEARCH_BASEURL);
  if(params.isbn) url.searchParams.append("isbn", params.isbn);
  return url.toString();
}

export async function lookupByIsbn(isbn: string){
  const url = composeSearchUrl({ isbn });
  const res = await fetch(url);
  const xml = await res.text().catch(console.error);
  const data = await parseStringPromise(xml!).catch(console.error);


  const item = data.rss.channel[0].item[0]; // FIXME: 無闇に0を取るべきではない気がする. 仕様要確認.
  const title = item.title[0];
  const author = item.author[0];
  const pubDate = item.pubDate[0];

  return { isbn, title, author, pubDate };

}
