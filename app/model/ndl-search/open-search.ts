import { MediaType } from './media-type';

const NDL_OPENSEARCH_BASEURL = "https://ndlsearch.ndl.go.jp/api/opensearch";

/*
 * NDL Search の OpenSearch APIで使えるパラメータ
 * 以下のURLにある仕様書を参考に実装
 * https://ndlsearch.ndl.go.jp/file/help/api/specifications/ndlsearch_api_20240712.pdf
 */

export type AllowMultiple<T> = T | T[];
export interface OpenSearchParameters {
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
