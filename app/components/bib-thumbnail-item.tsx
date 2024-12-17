import { Skeleton } from "~/components/ui/skeleton";

interface BibThumbnailItemProps {
	value: any;
}

export function BibThumbnailItem({ value }: BibThumbnailItemProps) {
	console.log(value.identifiers);

	const isbn = value.identifiers
		.filter(
			({ identifier_type }: any) =>
				identifier_type === "http://ndl.go.jp/dcndl/terms/ISBN",
		)
		.map(({ identifier }: any) => identifier)[0]
		.replaceAll("-", "");

	const ndlThumbnail = isbn
		? `https://ndlsearch.ndl.go.jp/thumbnail/${isbn}.jpg`
		: null;

	return (
		<div className="flex flex-col items-center gap-1">
			{ndlThumbnail ? (
				<img src={ndlThumbnail} />
			) : (
				<Skeleton className="h-[200px] w-[130px]" />
			)}
			<span className="font-bold text-xs"> {value.preferred_title} </span>
		</div>
	);
}
