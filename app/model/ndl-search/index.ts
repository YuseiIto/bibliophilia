import { search } from "./sru";
import { And } from "./cql";
import { DcNdlParser } from "./dcndl";
import { Repository } from "~/db/index";
import { Env } from "~/cloudflare";
import { v4 as uuidv4 } from "uuid";

export async function lookupByIsbn(isbn: string, env: Env) {
	const xml = await search({ query: And({ isbn }) });
	const parser = new DcNdlParser();
	await parser.parseXml(xml);

	const data = {
		isbn,
		title: parser.dctermsTitle,
		author: parser.dctermsCreator
			.map(({ name }: { name: string }) => {
				return name;
			})
			.join(" "),
		pubDate: parser.dctermsIssued
			.map(({ value }: { value: string }) => {
				return value;
			})
			.join(" "),
	};

	const db = new Repository(env);
	await db.insertWork({
		id: uuidv4(),
		preferred_title: parser.dctermsTitle,
		catalog_source: "url",
		catalog_source_type: "NDL",
		cataloging_rule: parser.catalogingRule,
	});

	return data;
}
