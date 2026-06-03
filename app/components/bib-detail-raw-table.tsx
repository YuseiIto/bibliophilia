import type { ReactNode } from "react";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { identifierTypes, type IdentifierType } from "~/model/identifier";
import { subjectTypes, type SubjectType } from "~/model/subject";
import type { BibRecordDetail } from "~/model/bib-record";

function Row({ label, children }: { label: string; children: ReactNode }) {
	return (
		<TableRow>
			<TableCell className="w-32 py-1.5 align-top whitespace-nowrap text-muted-foreground font-normal">
				{label}
			</TableCell>
			<TableCell className="py-1.5 align-top">{children}</TableCell>
		</TableRow>
	);
}

export function BibDetailRawTable({ record }: { record: BibRecordDetail }) {
	return (
		<section className="mt-12 border-t pt-8">
			<h2 className="text-sm font-bold mb-2">書誌情報</h2>
			<Table className="text-xs">
				<TableBody>
					<Row label="優先タイトル">{record.preferred_title}</Row>
					<Row label="タイトル ヨミ">{record.preferred_title_transcription ?? "—"}</Row>
					<Row label="巻次">{record.preferred_volume ?? "—"}</Row>
					<Row label="巻次タイトル">{record.preferred_volume_title ?? "—"}</Row>
					<Row label="巻次タイトル ヨミ">{record.preferred_volume_title_transcription ?? "—"}</Row>
					<Row label="別タイトル">
						{record.titles.length === 0
							? "—"
							: record.titles.map((t, idx) => (
									<div key={idx}>
										{t.title}
										{t.transcription ? `（${t.transcription}）` : ""}
									</div>
								))}
					</Row>
					<Row label="関与者">
						{record.agents.length === 0
							? "—"
							: record.agents.map((a, idx) => (
									<div key={idx}>
										{a.preferred_name}
										{a.preferred_name_transcription ? `（${a.preferred_name_transcription}）` : ""}
										{" ／ "}役割: {a.role}
										{" ／ "}根拠: 「{a.raw}」
									</div>
								))}
					</Row>
					<Row label="識別子">
						{record.identifiers.length === 0
							? "—"
							: record.identifiers.map((i, idx) => (
									<div key={idx}>
										{identifierTypes[i.identifier_type as IdentifierType] ?? i.identifier_type}: {i.identifier}
									</div>
								))}
					</Row>
					<Row label="件名">
						{record.subjects.length === 0
							? "—"
							: record.subjects.map((s, idx) => (
									<div key={idx}>
										{s.preferred_label}
										{s.preferred_label_transcription ? `（${s.preferred_label_transcription}）` : ""}
										{" "}
										<span className="text-muted-foreground">
											［{subjectTypes[s.subject_type as SubjectType] ?? s.subject_type}］
										</span>
									</div>
								))}
					</Row>
					<Row label="シリーズ">
						{record.seriesTitles.length === 0
							? "—"
							: record.seriesTitles.map((s, idx) => (
									<div key={idx}>
										{s.title}
										{s.transcription ? `（${s.transcription}）` : ""}
									</div>
								))}
					</Row>
					<Row label="言語">{record.languages.length ? record.languages.join("、") : "—"}</Row>
					<Row label="出版日付">{record.dates.length ? record.dates.join("、") : "—"}</Row>
					<Row label="形態">{record.extents.length ? record.extents.join("、") : "—"}</Row>
					<Row label="価格">{record.prices.length ? record.prices.join("、") : "—"}</Row>
					<Row label="抄録">{record.abstracts.length ? record.abstracts.join(" / ") : "—"}</Row>
					<Row label="注記">{record.descriptions.length ? record.descriptions.join(" / ") : "—"}</Row>
					<Row label="目録出典">{record.catalog_source}</Row>
					<Row label="目録出典種別">{record.catalog_source_type}</Row>
					<Row label="目録規則">{record.cataloging_rule ?? "—"}</Row>
					<Row label="レコードID">
						<code className="text-[11px]">{record.id}</code>
					</Row>
				</TableBody>
			</Table>
		</section>
	);
}
