import { Form } from "@remix-run/react";
import { Input } from "./ui/input";

import { Combobox } from "~/components/combobox";
import { PreferredTitleInput } from "~/components/preferred-title-input";

export function ManualCatalogComposer() {
	const catalogingRules = [
		{
			label: "日本目録規則2018年版 (NCR2018)",
			value: "ncr/2018",
		},
		{
			label: "日本目録規則1987年版 (NCR1987)",
			value: "ncr/1987",
		},
		{
			label: "日本目録規則1977年版 (NCR1977)",
			value: "ncr/1977",
		},
		{
			label: "日本目録規則 (NCR)",
			value: "ncr",
		},
		{
			label: "国立国会図書館逐次刊行物目録規則",
			value: "ndlserial",
		},
		{
			label: "RDA (Resource Description and Access)",
			value: "rda",
		},
		{
			label: "AACR (Anglo-American Cataloging Rules)",
			value: "aacr",
		},
	];

	return (
		<Form method="post">
			<div className="flex flex-col gap-3">
				<PreferredTitleInput />
				<Input
					placeholder="優先タイトルの読み"
					name="prefered_title_transcription"
				></Input>
				<Combobox options={catalogingRules} label="目録規則を選択" />
				<Input
					placeholder="目録情報の出典区分"
					name="catalog_source_type"
				></Input>
				<Input
					placeholder="目録情報の出典（URL等）"
					name="catalog_source"
				></Input>
				/* Selectにする */
				<Input placeholder="目録情報の出典区分" name="cataloging_rule"></Input>
				<Input placeholder="サムネイルURL" name="thumbnail_url"></Input>
				<Input placeholder="巻号" name="preferred_volume"></Input>
				<Input placeholder="巻号タイトル" name="preferred_volume_title"></Input>
				<Input
					placeholder="巻号タイトルよみ"
					name="preferred_volume_title_transcription"
				></Input>
				<Input
					placeholder="ISBN-10またはISBN-13 例: 4003107012"
					name="isbn"
				></Input>
			</div>
		</Form>
	);
}
