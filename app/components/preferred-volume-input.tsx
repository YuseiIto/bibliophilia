import { InputWithTooltip } from "~/components/input-with-tooltip";
import {
	VocabularyTooltipContent,
	HeadWord,
} from "~/components/vocabulary-tooltip-content";

interface PreferredVolumeInputProps {
	value?: string;
	onChange?: (value: string) => void;
}

export function PreferredVolumeInput({
	value,
	onChange,
}: PreferredVolumeInputProps) {
	return (
		<InputWithTooltip
			placeholder="優先巻号"
			name="preferred_volume"
			value={value}
			onChange={onChange}
		>
			<VocabularyTooltipContent>
				<HeadWord>優先巻号</HeadWord>
				<p>資料の巻号のうち優先して使用するもの。</p>
			</VocabularyTooltipContent>
		</InputWithTooltip>
	);
}
