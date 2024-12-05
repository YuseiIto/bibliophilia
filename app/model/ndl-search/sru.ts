import { CqlQuery, serializeCql } from "./cql";
import { XMLValidator, XMLParser } from "fast-xml-parser";
const NDL_SRU_BASEURL = "https://ndlsearch.ndl.go.jp/api/sru";

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
  const query = serializeCql(params.query);
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
  if (!XMLValidator.validate(xml)) throw new Error("Invalid XML");

  const options = {
    isArray: (name: string) => ["records"].includes(name),
  }

  const parser = new XMLParser(options);
  const json = await parser.parse(xml);
  const dcNdlDocument= json.searchRetrieveResponse.records[0].record.recordData;

  return dcNdlDocument;
}
