import { InputWithTooltip } from "~/components/input-with-tooltip";
import {
	VocabularyTooltipContent,
	HeadWord,
} from "~/components/vocabulary-tooltip-content";

interface PreferredVolumeTitleInputProps {
	value?: string;
	onChange?: (value: string) => void;
}

export function PreferredVolumeTitleInput({
	value,
	onChange,
}: PreferredVolumeTitleInputProps) {
	return (
		<InputWithTooltip
			placeholder="優先巻号タイトル"
			name="preferred_volume_title"
			value={value}
			onChange={onChange}
		>
			<VocabularyTooltipContent>
				<HeadWord>優先巻号タイトル</HeadWord>
				<p>資料の巻号タイトルのうち優先して使用するもの。</p>
			</VocabularyTooltipContent>
		</InputWithTooltip>
	);
}
