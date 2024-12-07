import { Form } from "@remix-run/react";
import { Input } from "./ui/input";

import { PreferredTitleInput } from "~/components/preferred-title-input";
import { CatalogingRuleInput } from "~/components/cataloging-rule-input";
import { CatalogSourceInput } from "~/components/catalog-source-input";
import {PreferredVolumeInput} from "~/components/preferred-volume-input";
import {PreferredVolumeTitleInput} from "~/components/preferred-volume-title-input";

export function ManualCatalogComposer() {
	return (
		<Form method="post">
			<div className="flex flex-col gap-3">
				<PreferredTitleInput />
				<Input
					placeholder="優先タイトルの読み"
					name="prefered_title_transcription"
				></Input>
				<CatalogSourceInput />
				<PreferredVolumeInput />
				<Input
					placeholder="優先巻号タイトルの読み"
					name="prefered_volume_title_transcription"
				></Input>
				<PreferredVolumeTitleInput />
				<CatalogingRuleInput />
			</div>
		</Form>
	);
}
