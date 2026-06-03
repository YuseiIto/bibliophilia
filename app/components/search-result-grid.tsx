import { Link } from "react-router";
import { BookCover } from "./book-cover";
import type { BibRecordSummary } from "~/model/bib-record";

export function SearchResultGrid({ records }: { records: BibRecordSummary[] }) {
	return (
		<div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4">
			{records.map((rec) => (
				<Link
					key={rec.id}
					to={`/works/${rec.id}`}
					className="flex flex-col items-center gap-1 hover:opacity-80"
				>
					<BookCover
						identifiers={rec.identifiers}
						className="aspect-[13/20] w-full max-w-[130px]"
					/>
					<span className="font-bold text-xs text-center">{rec.preferred_title}</span>
				</Link>
			))}
		</div>
	);
}
