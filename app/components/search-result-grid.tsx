import { Link } from "react-router";
import { Skeleton } from "~/components/ui/skeleton";
import { coverUrlFromIdentifiers } from "~/lib/cover";
import type { BibRecordSummary } from "~/model/bib-record";

export function SearchResultGrid({ records }: { records: BibRecordSummary[] }) {
	return (
		<div className="grid grid-cols-8 gap-4">
			{records.map((rec) => {
				const cover = coverUrlFromIdentifiers(rec.identifiers);
				return (
					<Link
						key={rec.id}
						to={`/works/${rec.id}`}
						className="flex flex-col items-center gap-1 hover:opacity-80"
					>
						{cover ? (
							<img src={cover} alt="" className="h-[200px] w-[130px] object-contain" />
						) : (
							<Skeleton className="h-[200px] w-[130px]" />
						)}
						<span className="font-bold text-xs text-center">{rec.preferred_title}</span>
					</Link>
				);
			})}
		</div>
	);
}
