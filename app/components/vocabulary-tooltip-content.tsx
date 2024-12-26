import type { ReactNode, ReactElement } from "react";

interface HeadWordProps {
	children?: ReactNode;
}

export function HeadWord({ children }: HeadWordProps) {
	return <h4 className="font-bold text-sm"> {children} </h4>;
}

interface VocabularyTooltipContentProps {
	children: [ReactElement<ReactElement<HeadWordProps>>, ReactNode];
}

export function VocabularyTooltipContent({
	children,
}: VocabularyTooltipContentProps) {
	return (
		<div className="flex flex-col p-2">
			<h4 className="font-bold text-sm"> {children[0]}</h4>
			{children[1]}
		</div>
	);
}
