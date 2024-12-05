import { search } from "./sru";
import { And } from "./cql";
import { DcNdlParser } from "./dcndl";

export async function lookupByIsbn(isbn: string) {
  const xml = await search({ query: And({ isbn }) });
  const parser = new DcNdlParser();
  await parser.parseXml(xml);

  const data = {
    isbn,
    title: parser.dctermsTitle,
    author: parser.dctermsCreator.map(({ name }: { name: string }) => { return name }).join(" "),
    pubDate: parser.dctermsIssued.map(({ value }: { value: string }) => { return value }).join(" ")
  };

  return data;
}
