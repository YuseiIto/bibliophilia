import { Link } from "react-router";
import { Skeleton } from "~/components/ui/skeleton";
import { coverUrlFromIdentifiers, ISBN_IDENTIFIER_TYPE } from "~/lib/cover";
import type { AgentRole } from "~/model/agent";
import type { BibRecordSummary } from "~/model/bib-record";

const PUBLISHER_ROLE: AgentRole = "出版者";

export function SearchResultList({ records }: { records: BibRecordSummary[] }) {
	return (
		<ul className="divide-y">
			{records.map((rec) => {
				const cover = coverUrlFromIdentifiers(rec.identifiers);
				const authors = rec.agents
					.filter((a) => a.role !== PUBLISHER_ROLE)
					.map((a) => a.preferred_name);
				const publisher = rec.agents.find((a) => a.role === PUBLISHER_ROLE)?.preferred_name;
				const isbn = rec.identifiers.find((i) => i.identifier_type === ISBN_IDENTIFIER_TYPE)?.identifier;
				const year = rec.dates[0];
				return (
					<li key={rec.id} className="py-3">
						<Link to={`/works/${rec.id}`} className="flex gap-3 hover:opacity-80">
							{cover ? (
								<img src={cover} alt="" className="h-16 w-11 object-contain flex-none" />
							) : (
								<Skeleton className="h-16 w-11 flex-none" />
							)}
							<div className="text-sm">
								<div className="font-bold">{rec.preferred_title}</div>
								{authors.length > 0 && (
									<div className="text-muted-foreground">{authors.join(" / ")}</div>
								)}
								<div className="text-muted-foreground text-xs">
									{[publisher, year].filter(Boolean).join(", ")}
									{isbn ? ` ・ ISBN ${isbn}` : ""}
								</div>
							</div>
						</Link>
					</li>
				);
			})}
		</ul>
	);
}
