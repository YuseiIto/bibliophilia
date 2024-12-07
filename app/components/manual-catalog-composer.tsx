import { Form } from "@remix-run/react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

import { Save } from "@mynaui/icons-react";

import { PreferredTitleInput } from "~/components/preferred-title-input";
import { CatalogingRuleInput } from "~/components/cataloging-rule-input";
import { CatalogSourceInput } from "~/components/catalog-source-input";
import { PreferredVolumeInput } from "~/components/preferred-volume-input";
import { PreferredVolumeTitleInput } from "~/components/preferred-volume-title-input";

import type { Work } from "~/model/work";
import { isCatalogSourceType } from "~/model/work";

interface ManualCatalogComposerProps {
	onSubmit?: (data: Partial<Work>) => void;
}

export function ManualCatalogComposer({
	onSubmit,
}: ManualCatalogComposerProps) {
	const onSubmitWrapper = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const formData = new FormData(form);

		// TODO: validation

		const catalogSourceType = formData.get("catalog_source_type")!.toString();
		if (!isCatalogSourceType(catalogSourceType))
			throw new Error("Invalid catalog_source_type");

		const data: Omit<Work, "id"> = {
			preferred_title: formData.get("preferred_title")!.toString(),
			preferred_title_transcription: formData
				.get("preferred_title_transcription")!
				.toString(),
			catalog_source: formData.get("catalog_source")!.toString(),
			catalog_source_type: catalogSourceType,
			cataloging_rule: formData.get("cataloging_rule")!.toString(),
			preferred_volume: formData.get("preferred_volume")!.toString(),
			preferred_volume_title: formData
				.get("preferred_volume_title")!
				.toString(),
			preferred_volume_title_transcription: formData
				.get("preferred_volume_title_transcription")!
				.toString(),
		};

		if (onSubmit) onSubmit(data);
	};

	return (
		<Form onSubmit={onSubmitWrapper}>
			<div className="flex flex-col gap-3">
				<PreferredTitleInput />
				<Input
					placeholder="優先タイトルの読み"
					name="preferred_title_transcription"
				></Input>
				<CatalogSourceInput />
				<PreferredVolumeInput />
				<Input
					placeholder="優先巻号タイトルの読み"
					name="preferred_volume_title_transcription"
				></Input>
				<PreferredVolumeTitleInput />
				<CatalogingRuleInput />
				<Button className="p-2" type="submit">
					<Save /> 保存
				</Button>
			</div>
		</Form>
	);
}
