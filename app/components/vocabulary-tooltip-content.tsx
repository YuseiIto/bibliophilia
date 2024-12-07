interface VocabularyTooltipContentProps {
	children: [HeadWord, ReactNode];
}

export function HeadWord({ children }: { children?: ReactNode }) {
	return <h4 className="font-bold text-sm"> {children} </h4>;
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
