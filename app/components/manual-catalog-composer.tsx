import { Form } from "@remix-run/react";
import { Input } from "./ui/input";

import { PreferredTitleInput } from "~/components/preferred-title-input";
import { CatalogingRuleInput } from "~/components/cataloging-rule-input";

export function ManualCatalogComposer() {
	return (
		<Form method="post">
			<div className="flex flex-col gap-3">
				<PreferredTitleInput />
				<Input
					placeholder="優先タイトルの読み"
					name="prefered_title_transcription"
				></Input>
				<Input
					placeholder="目録情報の出典区分"
					name="catalog_source_type"
				></Input>
				<Input
					placeholder="目録情報の出典（URL等）"
					name="catalog_source"
				></Input>
				preferred_volume: text(), preferred_volume_title: text(),
				preferred_volume_title_transcription: text(),
				<CatalogingRuleInput />
			</div>
		</Form>
	);
}
