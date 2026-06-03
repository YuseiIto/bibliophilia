import { useState } from "react";
import { BookImage } from "@mynaui/icons-react";
import { coverUrlFromIdentifiers } from "~/lib/cover";
import { cn } from "~/lib/utils";
import type { Identifier } from "~/model/identifier";

// 書影を表示する。ISBN から NDL サムネイルを引くが、ISBN が無い場合や
// NDL に書影が無く読み込みに失敗した場合はプレースホルダ（本アイコン）を出す。
export function BookCover({
	identifiers,
	className,
}: {
	identifiers: Identifier[];
	className?: string;
}) {
	const url = coverUrlFromIdentifiers(identifiers);
	const [failed, setFailed] = useState(false);

	return (
		<div
			className={cn(
				"flex items-center justify-center overflow-hidden rounded-sm bg-muted",
				className,
			)}
		>
			{!url || failed ? (
				<BookImage className="h-8 w-8 text-muted-foreground" />
			) : (
				<img
					src={url}
					alt=""
					onError={() => setFailed(true)}
					className="h-full w-full object-contain"
				/>
			)}
		</div>
	);
}
