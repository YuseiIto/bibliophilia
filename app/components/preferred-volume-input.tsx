import { InputWithTooltip } from "~/components/input-with-tooltip";
import {
	VocabularyTooltipContent,
	HeadWord,
} from "~/components/vocabulary-tooltip-content";

export function PreferredVolumeInput() {
	return (
		<InputWithTooltip placeholder="優先巻号" name="preferred_volume">
			<VocabularyTooltipContent>
				<HeadWord>優先巻号</HeadWord>
				<p>資料の巻号のうち優先して使用するもの。</p>
			</VocabularyTooltipContent>
		</InputWithTooltip>
	);
}
