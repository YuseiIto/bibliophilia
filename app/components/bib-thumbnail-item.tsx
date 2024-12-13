import { Skeleton } from "~/components/ui/skeleton";

interface BibThumbnailItemProps {
	value: any;
}

export function BibThumbnailItem({ value }: BibThumbnailItemProps) {
	console.log(value);
	return <Skeleton className="w-[130px] h-[200px]" />;
}
