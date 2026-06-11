import { useState } from "react";
import { BookImage } from "@mynaui/icons-react";
import { coverUrlFromIdentifiers } from "~/lib/cover";
import { cn } from "~/lib/utils";
import type { Identifier } from "~/model/identifier";

// 書影を表示する。ISBN から Google Books の書影をプロキシ経由で引くが、ISBN が
// 無い場合や書影が無く読み込みに失敗した場合はプレースホルダ（本アイコン）を出す。
export function BookCover({
	identifiers,
	className,
}: {
	identifiers: Identifier[];
	className?: string;
}) {
	const url = coverUrlFromIdentifiers(identifiers);
	const [failed, setFailed] = useState(false);

	// 別の本に差し替わった (url が変わった) ら失敗状態をリセットし、前の本の読み込み
	// 失敗が新しい本の placeholder に残らないようにする。React 推奨の「描画中に前回値と
	// 比較して state を調整する」パターン。
	const [prevUrl, setPrevUrl] = useState(url);
	if (url !== prevUrl) {
		setPrevUrl(url);
		setFailed(false);
	}

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
