import { useState, useEffect } from "react";
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
	value?: Partial<Work>;
	onSubmit?: (data: Partial<Work>) => void;
}

export function ManualCatalogComposer({
	onSubmit,
	value,
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

	const [values, setValues] = useState<Partial<Work>>(
		value ?? {
			preferred_title: "",
			preferred_title_transcription: "",
			catalog_source: "",
			catalog_source_type: "",
			cataloging_rule: "",
			preferred_volume: "",
			preferred_volume_title: "",
			preferred_volume_title_transcription: "",
		},
	);

	const [preferredTitle, setPreferredTitle] = useState(
		values.preferred_title ?? "",
	);
	const [preferredTitleTranscription, setPreferredTitleTranscription] =
		useState(values.preferred_title_transcription ?? "");
	const [sourceType, setSourceType] = useState(
		values.catalog_source_type ?? "",
	);
	const [source, setSource] = useState(values.catalog_source ?? "");
	const [preferredVolume, setPreferredVolume] = useState(
		values.preferred_volume ?? "",
	);
	const [preferredVolumeTitle, setPreferredVolumeTitle] = useState(
		values.preferred_volume_title ?? "",
	);
	const [
		preferredVolumeTitleTranscription,
		setPreferredVolumeTitleTranscription,
	] = useState(values.preferred_title_transcription ?? "");
	const [catalogingRule, setCatalogingRule] = useState(
		values.cataloging_rule ?? "",
	);

	useEffect(() => {
		setValues({ preferred_title: preferredTitle, ...values });
	}, [preferredTitle]);

	useEffect(() => {
		setValues({
			preferred_title_transcription: preferredTitleTranscription,
			...values,
		});
	});

	useEffect(() => {
		setValues({ catalog_source_type: sourceType, ...values });
	}, [sourceType]);

	useEffect(() => {
		setValues({ catalog_source: source, ...values });
	}, [source]);

	useEffect(() => {
		setValues({ preferred_volume: preferredVolume, ...values });
	}, [preferredVolume]);

	useEffect(() => {
		setValues({ preferred_volume_title: preferredVolumeTitle, ...values });
	}, [preferredVolumeTitle]);

	useEffect(() => {
		setValues({
			preferred_volume_title_transcription: preferredVolumeTitleTranscription,
			...values,
		});
	}, [preferredVolumeTitleTranscription]);

	useEffect(() => {
		setValues({ cataloging_rule: catalogingRule, ...values });
	}, [catalogingRule]);

	return (
		<Form onSubmit={onSubmitWrapper}>
			<div className="flex flex-col gap-3">
				<PreferredTitleInput
					value={preferredTitle}
					onChange={setPreferredTitle}
				/>
				<Input
					placeholder="優先タイトルの読み"
					name="preferred_title_transcription"
					value={preferredTitleTranscription}
					onChange={(e) => setPreferredTitleTranscription(e.target.value)}
				></Input>

				<CatalogSourceInput
					sourceType={sourceType}
					onSourceTypeChange={setSourceType}
					source={source}
					onSourceChange={setSource}
				/>

				<PreferredVolumeInput
					value={preferredVolume}
					onChange={setPreferredVolume}
				/>

				<PreferredVolumeTitleInput
					value={preferredVolumeTitle}
					onChange={setPreferredVolumeTitle}
				/>

				<Input
					placeholder="優先巻号タイトルの読み"
					name="preferred_volume_title_transcription"
					value={preferredVolumeTitleTranscription}
					onChange={(e) => setPreferredVolumeTitleTranscription(e.target.value)}
				></Input>

				<CatalogingRuleInput
					value={catalogingRule}
					onChange={setCatalogingRule}
				/>

				<Button className="p-2" type="submit">
					<Save /> 保存
				</Button>
			</div>
		</Form>
	);
}
