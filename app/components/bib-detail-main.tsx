import { Badge } from "~/components/ui/badge";
import { ISBN_IDENTIFIER_TYPE } from "~/lib/cover";
import { PUBLISHER_ROLE } from "~/model/agent";
import type { BibRecordDetail } from "~/model/bib-record";

export function BibDetailMain({ record }: { record: BibRecordDetail }) {
	const contributors = record.agents.filter((a) => a.role !== PUBLISHER_ROLE);
	const publisher = record.agents.find((a) => a.role === PUBLISHER_ROLE)?.preferred_name;
	const description = [...record.abstracts, ...record.descriptions];
	const isbn = record.identifiers.find(
		(i) => i.identifier_type === ISBN_IDENTIFIER_TYPE,
	)?.identifier;

	const publicationFacts = [
		publisher,
		record.dates[0],
		record.extents[0],
		record.prices[0],
	].filter(Boolean);

	const minorFacts = [
		record.languages.length ? record.languages.join("、") : null,
		isbn ? `ISBN ${isbn}` : null,
	].filter(Boolean);

	return (
		<div className="flex-1 min-w-0">
			<h1 className="text-2xl font-bold leading-tight">{record.preferred_title}</h1>
			{record.preferred_title_transcription && (
				<p className="text-sm text-muted-foreground">
					{record.preferred_title_transcription}
				</p>
			)}

			{contributors.length > 0 && (
				<p className="mt-2 text-sm">
					{contributors.map((a) => `${a.preferred_name}（${a.role}）`).join(" ・ ")}
				</p>
			)}

			{publicationFacts.length > 0 && (
				<p className="mt-2 text-sm text-muted-foreground">{publicationFacts.join(" ・ ")}</p>
			)}
			{minorFacts.length > 0 && (
				<p className="mt-1 text-xs text-muted-foreground">{minorFacts.join(" ・ ")}</p>
			)}

			{record.subjects.length > 0 && (
				<div className="mt-3 flex flex-wrap gap-1">
					{record.subjects.map((s, idx) => (
						<Badge key={idx} variant="secondary">
							{s.preferred_label}
						</Badge>
					))}
				</div>
			)}

			{description.length > 0 && (
				<div className="mt-3 space-y-1 text-sm">
					{description.map((d, idx) => (
						<p key={idx}>{d}</p>
					))}
				</div>
			)}

			<p className="mt-4 text-xs text-muted-foreground">
				目録出典: {record.catalog_source}
				{record.cataloging_rule
					? `　／　目録規則: ${record.cataloging_rule.toUpperCase()}`
					: ""}
			</p>
		</div>
	);
}
