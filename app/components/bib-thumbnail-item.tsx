import { Skeleton } from "~/components/ui/skeleton";

interface BibThumbnailItemProps {
	value: any;
}

export function BibThumbnailItem({ value }: BibThumbnailItemProps) {
	console.log(value);
	return (
		<div className="flex flex-col items-center gap-1">
			<Skeleton className="w-[130px] h-[200px]" />
			<span className="font-bold text-xs"> {value.preferred_title} </span>
		</div>
	);
}
