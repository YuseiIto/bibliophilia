import { InputWithTooltip } from "~/components/input-with-tooltip";
import {
	VocabularyTooltipContent,
	HeadWord,
} from "~/components/vocabulary-tooltip-content";

export function PreferredTitleInput() {
	return (
		<InputWithTooltip placeholder="優先タイトル" name="preferred_title">
			<VocabularyTooltipContent>
				<HeadWord>優先タイトル</HeadWord>
				<p>資料の名称のうち典拠形であるもの。</p>
			</VocabularyTooltipContent>
		</InputWithTooltip>
	);
}
