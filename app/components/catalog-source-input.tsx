import { InputWithTooltip } from "~/components/input-with-tooltip";

import {
	VocabularyTooltipContent,
	HeadWord,
} from "~/components/vocabulary-tooltip-content";

import { ComboboxWithTooltip } from "~/components/combobox-with-tooltip";
import type { CatalogSourceType } from "~/model/work";
import type { ComboboxOption } from "~/components/combobox";

interface CatalogSourceInputProps {
	sourceType?: CatalogSourceType | null;
	source?: string;
	onSourceTypeChange?: (value: CatalogSourceType | null) => void;
	onSourceChange?: (value: string) => void;
}

export function CatalogSourceInput({
	sourceType,
	source,
	onSourceTypeChange,
	onSourceChange,
}: CatalogSourceInputProps) {
	const catalogSourceTypes: ComboboxOption<CatalogSourceType>[] = [
		{
			label: "新規作成",
			value: "manual:original",
		},
		{
			label: "その他",
			value: "manual:other",
		},
	];

	const sourceTypeValidator = (value: CatalogSourceType | null) => {
		if (!value) {
			return "目録情報の出典区分は必須です。";
		}
		return null;
	};

	const sourceValidator = (value: string) => {
		if (!value && sourceType != "manual:original") {
			return "新規作成以外の目録情報の出典は必須です。";
		}
		return null;
	};

	return (
		<div className="flex flex-col gap-3">
			<ComboboxWithTooltip
				label="目録情報の出典区分を選択"
				options={catalogSourceTypes}
				name="catalog_source_type"
				value={sourceType}
				onChange={onSourceTypeChange}
				validator={sourceTypeValidator}
			>
				<VocabularyTooltipContent>
					<HeadWord> 目録情報の出典区分 </HeadWord>
					<div>
						<p> 目録情報の出典の種類を選択。 </p>
						<p>
							資料の実物から新たにメタデータを作成した場合
							「新規作成」、その他の場合は「その他」を設定する 。
						</p>
					</div>
				</VocabularyTooltipContent>
			</ComboboxWithTooltip>
			<InputWithTooltip
				placeholder="目録情報の出典（URL等）"
				name="catalog_source"
				value={source}
				onChange={onSourceChange}
				validator={sourceValidator}
			>
				<VocabularyTooltipContent>
					<HeadWord> 目録情報の出典 </HeadWord>
					<div>
						<p>
							目録情報を取得したもとになった情報をURIまたは自然言語で記述する。
						</p>
					</div>
				</VocabularyTooltipContent>
			</InputWithTooltip>
		</div>
	);
}
