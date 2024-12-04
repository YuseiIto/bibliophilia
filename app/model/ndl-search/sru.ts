import { CqlQuery, And, serializeCql } from "./cql";
import { parseStringPromise } from "xml2js";
const NDL_SRU_BASEURL = "https://ndlsearch.ndl.go.jp/api/sru";
import fs from "fs";
/*
 * NDL Search の SRU APIで使えるパラメータ
 * 以下のURLにある仕様書を参考に実装
 * ただし、version 1.2のみ対応.
 * https://ndlsearch.ndl.go.jp/file/help/api/specifications/ndlsearch_api_20240712.pdf
 */
export interface SruSearchParameters {
  query: CqlQuery; // 検索条件
  startRecord?: number; // 開始位置
  maximumRecords?: number; // 最大取得件数
  inprrocess?: boolean; // trueのとき、国立国会図書館新着書誌情報のみを検索
  onlyBib?: boolean; // trueのとき、書誌情報のみを検索
}

export function composeSearchUrl(params: SruSearchParameters) {
  const url = new URL(NDL_SRU_BASEURL);
  url.searchParams.append("operation", "searchRetrieve");
  url.searchParams.append("recordSchema", "dcndl");
  url.searchParams.append("recordPacking", "xml");
  const query = serializeCql(params.query);
  console.log(`"${query}"`);
  url.searchParams.append("query", encodeURI(query));
  if (params.startRecord) url.searchParams.append("startRecord", params.startRecord.toString());
  if (params.maximumRecords) url.searchParams.append("maximumRecords", params.maximumRecords.toString());
  if (params.inprrocess) url.searchParams.append("inprrocess", "true");
  if (params.onlyBib) url.searchParams.append("onlyBib", "true");

  return url.toString();
}

export async function search(params: SruSearchParameters) {
  const url = composeSearchUrl(params);
  const res = await fetch(url);
  const xml = await res.text().catch(console.error);
  if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
  if (!xml) throw new Error("Empty response");

  const parsed = await parseStringPromise(xml);
  const record = parsed["searchRetrieveResponse"]["records"][0]["record"][0]["recordData"][0];
  const x= record["rdf:RDF"][0];
  fs.writeFileSync("test.json", JSON.stringify(x, null, 2));
  console.log(x)
}

export async function findByIsbn(isbn: string) {
  const params = {
    query: And({ isbn }),
  };
  await search(params);
}
