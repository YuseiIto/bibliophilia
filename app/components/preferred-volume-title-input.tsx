import { InputWithTooltip } from "~/components/input-with-tooltip";
import {
	VocabularyTooltipContent,
	HeadWord,
} from "~/components/vocabulary-tooltip-content";

export function PreferredVolumeTitleInput() {
	return (
		<InputWithTooltip
			placeholder="優先巻号タイトル"
			name="preferred_volume_title"
		>
			<VocabularyTooltipContent>
				<HeadWord>優先巻号タイトル</HeadWord>
				<p>資料の巻号タイトルのうち優先して使用するもの。</p>
			</VocabularyTooltipContent>
		</InputWithTooltip>
	);
}
