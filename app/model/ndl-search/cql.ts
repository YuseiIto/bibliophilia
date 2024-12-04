import { MediaType } from './media-type';


// `any` の要素すべてにマッチするレコードを選択するクエリ
type CqlAny<T> = {
  any: T[];
};

// {title: Any(["xxxx", "yyyy"])} という形で書けるようにするためのユーティリティ
export function Any<T>(value: T | T[]): CqlAny<T> {
  return { any: Array.isArray(value) ? value : [value] };
}

// `all`の要素すべてにマッチするレコードを選択するクエリ
type CqlAll<T> = {
  all: T[];
};

// {title: All(["xxxx", "yyyy"])} という形で書けるようにするためのユーティリティ
export function All<T>(value: T[]): CqlAll<T> {
  return { all: value };
}

// 「Anyで接続される複数の値」または「単一の値」をキーとして許容するフィールド
type Any<T> = T | CqlAny<T>;

// 「Any、またはAllで接続される複数の値」または「単一の値」をキーとして許容するフィールド
type AnyOrAll<T> = T | CqlAny<T> | CqlAll<T>;

// CqlのSortByフィールドの値
export type SortingKey = "title" | "creator" | "issued_date" | "created_date" | "modified_date";
export type SoringOrder = "sort.ascending" | "sort.descending";

/* 
 * Cqlでクエリできるフィールド
 * NDLのSRUの仕様書を参考に実装
 */
export interface CqlQueryParameters {
  dpid?: Any<string>; // データプロバイダID, データグループID, コレクションコード, AccessRights
  dpgroupid?: string; // データプロバイダグループID
  title?: AnyOrAll<string>; // タイトル
  creator?: AnyOrAll<string>; // 作成者
  publisher?: AnyOrAll<string>; // 出版者
  digitizedPublisher?: AnyOrAll<string>; // デジタル化した製作者
  ndc?: string; // NDC, NDLC, LCC, DDC, UDC
  ndlc?: string; // NDLC
  description?: AnyOrAll<string>; // 内容記述
  subject?: AnyOrAll<string>; // 主題
  isbn?: string; // ISBN. 10桁または13桁
  issn?: string; // ISSN.
  jpno?: string; // 全国書誌番号
  from?: string; // 開始出版年月日 (YYYY, YYYY-MM, YYYY-MM-DD)
  until?: string; // 終了出版年月日  (YYYY, YYYY-MM, YYYY-MM-DD)
  anywhere?: AnyOrAll<string>; // 国立国会図書館サーチの簡易検索相当
  itemno?: string; // 国立国会図書館サーチ内部での書誌のトークン
  mediatype?: Any<MediaType>;
  sortBy?: [SortingKey, SoringOrder];
}

// 各フィールドをANDで接続して構成するクエリ
type CqlAndQuery = {
  query: CqlQueryParameters;
  strategy: "and";
};

// And({isbn: xxxxx, title: xxxxx}) という形で書けるようにするためのユーティリティ
export function And(query: CqlQueryParameters): CqlAndQuery {
  return { query, strategy: "and" };
}

// 各フィールドをORで接続して構成するクエリ
type CqlOrQuery = {
  query: CqlQueryParameters;
  strategy: "or";
};

// Or({isbn: xxxxx, title: xxxxx}) という形で書けるようにするためのユーティリティ
export function Or(query: CqlQueryParameters): CqlOrQuery {
  return { query, strategy: "or" };
}

export type CqlQuery = CqlAndQuery | CqlOrQuery;

const serializeAny = (key: string, value: Any<string>) => {
  if (typeof value === "string") {
    return `${key}=${value}`;
  } else {
    return `${key} any "${value.any.join(" ")}"}`;
  }
}

const serializeAnyOrAll = (key: string, value: AnyOrAll<string>) => {
  if (typeof value === "string") {
    return `${key}=${value}`;
  } else if ("any" in value) {
    return `${key} any "${value.any.join(" ")}"}`;
  } else {
    return `${key} all "${value.all.join(" ")}"}`;
  }
}

const serializeSorting = ([key, order]: [SortingKey, SoringOrder]) => {
  return `sortBy = ${key}/${order}`;
}

export function serializeCql(cql: CqlQuery): string {
  const parts: string[] = [];
  if (cql.query.dpid) parts.push(serializeAny("dpid", cql.query.dpid));
  if (cql.query.dpgroupid) parts.push(`dpgroupid=${cql.query.dpgroupid}`);
  if (cql.query.title) parts.push(serializeAnyOrAll("title", cql.query.title));
  if (cql.query.creator) parts.push(serializeAnyOrAll("creator", cql.query.creator));
  if (cql.query.publisher) parts.push(serializeAnyOrAll("publisher", cql.query.publisher));
  if (cql.query.digitizedPublisher) parts.push(serializeAnyOrAll("digitizedPublisher", cql.query.digitizedPublisher));
  if (cql.query.ndc) parts.push(`ndc=${cql.query.ndc}`);
  if (cql.query.ndlc) parts.push(`ndlc=${cql.query.ndlc}`);
  if (cql.query.description) parts.push(serializeAnyOrAll("description", cql.query.description));
  if (cql.query.subject) parts.push(serializeAnyOrAll("subject", cql.query.subject));
  if (cql.query.isbn) parts.push(`isbn=${cql.query.isbn}`);
  if (cql.query.issn) parts.push(`issn=${cql.query.issn}`);
  if (cql.query.jpno) parts.push(`jpno=${cql.query.jpno}`);
  if (cql.query.from) parts.push(`from=${cql.query.from}`);
  if (cql.query.until) parts.push(`until=${cql.query.until}`);
  if (cql.query.anywhere) parts.push(serializeAnyOrAll("anywhere", cql.query.anywhere));
  if (cql.query.itemno) parts.push(`itemno=${cql.query.itemno}`);
  if (cql.query.mediatype) parts.push(serializeAny("mediatype", cql.query.mediatype));
  if (cql.query.sortBy) parts.push(serializeSorting(cql.query.sortBy));
  return parts.join(' ' + cql.strategy + ' ');
}
