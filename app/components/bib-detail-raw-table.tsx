import type { ReactNode } from "react";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { identifierTypes, type IdentifierType } from "~/model/identifier";
import { subjectTypes, type SubjectType } from "~/model/subject";
import type { BibRecordDetail } from "~/model/bib-record";

function Row({ label, children }: { label: string; children: ReactNode }) {
	return (
		<TableRow>
			<TableCell className="w-48 align-top text-muted-foreground font-normal">{label}</TableCell>
			<TableCell className="align-top">{children}</TableCell>
		</TableRow>
	);
}

export function BibDetailRawTable({ record }: { record: BibRecordDetail }) {
	return (
		<section className="mt-8">
			<h2 className="text-sm font-bold">全項目（生データ）</h2>
			<p className="text-xs text-muted-foreground">DB に保存している全フィールド。目録の検証用。</p>
			<Table className="mt-2 text-xs">
				<TableBody>
					<Row label="id"><code>{record.id}</code></Row>
					<Row label="preferred_title">{record.preferred_title}</Row>
					<Row label="preferred_title_transcription">{record.preferred_title_transcription ?? "—"}</Row>
					<Row label="preferred_volume">{record.preferred_volume ?? "—"}</Row>
					<Row label="preferred_volume_title">{record.preferred_volume_title ?? "—"}</Row>
					<Row label="catalog_source">{record.catalog_source}</Row>
					<Row label="catalog_source_type">{record.catalog_source_type}</Row>
					<Row label="cataloging_rule">{record.cataloging_rule ?? "—"}</Row>
					<Row label="identifiers">
						{record.identifiers.length === 0
							? "—"
							: record.identifiers.map((i, idx) => (
									<div key={idx}>
										{identifierTypes[i.identifier_type as IdentifierType] ?? i.identifier_type}: {i.identifier}
									</div>
								))}
					</Row>
					<Row label="agents">
						{record.agents.length === 0
							? "—"
							: record.agents.map((a, idx) => (
									<div key={idx}>
										{a.preferred_name}
										{a.preferred_name_transcription ? `（${a.preferred_name_transcription}）` : ""} — role: {a.role} / raw: <code>{a.raw}</code>
									</div>
								))}
					</Row>
					<Row label="titles (別タイトル)">
						{record.titles.length === 0
							? "—"
							: record.titles.map((t, idx) => (
									<div key={idx}>
										{t.title}
										{t.transcription ? `（${t.transcription}）` : ""}
									</div>
								))}
					</Row>
					<Row label="subjects">
						{record.subjects.length === 0
							? "—"
							: record.subjects.map((s, idx) => (
									<div key={idx}>
										{s.preferred_label}{" "}
										<span className="text-muted-foreground">
											({subjectTypes[s.subject_type as SubjectType] ?? s.subject_type})
										</span>
									</div>
								))}
					</Row>
					<Row label="series_titles">
						{record.seriesTitles.length === 0
							? "—"
							: record.seriesTitles.map((s, idx) => (
									<div key={idx}>
										{s.title}
										{s.transcription ? `（${s.transcription}）` : ""}
									</div>
								))}
					</Row>
					<Row label="languages">{record.languages.length ? record.languages.join(", ") : "—"}</Row>
					<Row label="prices">{record.prices.length ? record.prices.join(", ") : "—"}</Row>
					<Row label="extents">{record.extents.length ? record.extents.join(", ") : "—"}</Row>
					<Row label="abstracts">{record.abstracts.length ? record.abstracts.join(" / ") : "—"}</Row>
					<Row label="descriptions">{record.descriptions.length ? record.descriptions.join(" / ") : "—"}</Row>
					<Row label="dates">{record.dates.length ? record.dates.join(", ") : "—"}</Row>
				</TableBody>
			</Table>
		</section>
	);
}
