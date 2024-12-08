import { InputWithTooltip } from "~/components/input-with-tooltip";
import {
	VocabularyTooltipContent,
	HeadWord,
} from "~/components/vocabulary-tooltip-content";

interface PreferredTitleInputProps {
	value: string;
	onChange: (value: string) => void;
}

export function PreferredTitleInput({
	value,
	onChange,
}: PreferredTitleInputProps) {
	const validator = (value: string) => {
		if (value === "") return "優先タイトルは必須です";
		return null;
	};

	return (
		<InputWithTooltip
			placeholder="優先タイトル"
			name="preferred_title"
			value={value}
			onChange={onChange}
			validator={validator}
		>
			<VocabularyTooltipContent>
				<HeadWord>優先タイトル</HeadWord>
				<p>資料の名称のうち典拠形であるもの。</p>
			</VocabularyTooltipContent>
		</InputWithTooltip>
	);
}
