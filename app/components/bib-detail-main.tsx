import type { ReactNode } from "react";
import { Badge } from "~/components/ui/badge";
import { PUBLISHER_ROLE } from "~/model/agent";
import type { BibRecordDetail } from "~/model/bib-record";

function Section({ title, children }: { title: string; children: ReactNode }) {
	return (
		<section className="mt-4">
			<h2 className="text-xs font-bold uppercase tracking-wide text-muted-foreground border-b pb-0.5 mb-1">
				{title}
			</h2>
			<div className="text-sm">{children}</div>
		</section>
	);
}

export function BibDetailMain({ record }: { record: BibRecordDetail }) {
	const contributors = record.agents.filter((a) => a.role !== PUBLISHER_ROLE);
	const description = [...record.abstracts, ...record.descriptions];

	return (
		<div>
			<h1 className="text-xl font-bold">{record.preferred_title}</h1>
			{record.preferred_title_transcription && (
				<p className="text-xs text-muted-foreground">{record.preferred_title_transcription}</p>
			)}
			{contributors.length > 0 && (
				<Section title="関与者">
					{contributors.map((a, idx) => (
						<div key={idx}>
							{a.preferred_name}（{a.role}）
						</div>
					))}
				</Section>
			)}
			{record.subjects.length > 0 && (
				<Section title="件名">
					<div className="flex flex-wrap gap-1">
						{record.subjects.map((s, idx) => (
							<Badge key={idx} variant="secondary">
								{s.preferred_label}
							</Badge>
						))}
					</div>
				</Section>
			)}
			{description.length > 0 && (
				<Section title="概要">
					{description.map((d, idx) => (
						<p key={idx}>{d}</p>
					))}
				</Section>
			)}
			<Section title="目録情報">
				<div className="flex flex-wrap gap-1">
					<Badge variant="outline">出典 {record.catalog_source}</Badge>
					{record.cataloging_rule && (
						<Badge variant="outline">規則 {record.cataloging_rule.toUpperCase()}</Badge>
					)}
				</div>
			</Section>
		</div>
	);
}
