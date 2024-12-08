import { useState, useEffect, FormEvent } from "react";
import { Form } from "@remix-run/react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

import { Save } from "@mynaui/icons-react";

import { PreferredTitleInput } from "~/components/preferred-title-input";
import { CatalogingRuleInput } from "~/components/cataloging-rule-input";
import { CatalogSourceInput } from "~/components/catalog-source-input";
import { PreferredVolumeInput } from "~/components/preferred-volume-input";
import { PreferredVolumeTitleInput } from "~/components/preferred-volume-title-input";

import {
	WorkDraft,
	CatalogSourceType,
	CatalogingRule,
	isCatalogSourceType,
	isCatalogingRule,
} from "~/model/work";

import { v4 as uuidv4 } from "uuid";

interface ManualCatalogComposerProps {
	value?: WorkDraft;
	onSubmit?: (data: WorkDraft) => void;
}

export function ManualCatalogComposer({
	onSubmit,
	value,
}: ManualCatalogComposerProps) {
	const [values, setValues] = useState<WorkDraft>({
		id: value?.id ?? uuidv4(),
		preferred_title: value?.preferred_title ?? null,
		preferred_title_transcription: null,
		catalog_source: null,
		catalog_source_type: null,
		cataloging_rule: null,
		thumbnail_url: null,
		preferred_volume: null,
		preferred_volume_title: null,
		preferred_volume_title_transcription: null,
	});

	const onSubmitWrapper = (e: FormEvent) => {
		e.preventDefault();
		if (onSubmit) onSubmit(values);
	};

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
	const [catalogingRule, setCatalogingRule] = useState(
		values.cataloging_rule ?? "",
	);
	const [preferredVolumeTitle, setPreferredVolumeTitle] = useState(
		values.preferred_volume_title ?? "",
	);
	const [
		preferredVolumeTitleTranscription,
		setPreferredVolumeTitleTranscription,
	] = useState(values.preferred_title_transcription ?? "");

	useEffect(() => {
		const newValues = structuredClone(values);
		newValues.preferred_title = preferredTitle;
		setValues(newValues);
	}, [preferredTitle]);

	useEffect(() => {
		const newValues = structuredClone(values);
		newValues.preferred_title_transcription = preferredTitleTranscription;
		setValues(newValues);
	}, [preferredTitleTranscription]);

	useEffect(() => {
		const newValues = structuredClone(values);
		if (!isCatalogSourceType(sourceType) && sourceType != "")
			throw new Error("Invalid source type");
		newValues.catalog_source_type = sourceType as CatalogSourceType;
		setValues(newValues);
	}, [sourceType]);

	useEffect(() => {
		const newValues = structuredClone(values);
		newValues.catalog_source = source;
		setValues(newValues);
	}, [source]);

	useEffect(() => {
		const newValues = structuredClone(values);
		newValues.preferred_volume = preferredVolume;
		setValues(newValues);
	}, [preferredVolume]);

	useEffect(() => {
		const newValues = structuredClone(values);
		newValues.preferred_volume_title = preferredVolumeTitle;
		setValues(newValues);
	}, [preferredVolumeTitle]);

	useEffect(() => {
		const newValues = structuredClone(values);
		newValues.preferred_volume_title_transcription =
			preferredVolumeTitleTranscription;
		setValues(newValues);
	}, [preferredVolumeTitleTranscription]);

	useEffect(() => {
		if (!isCatalogingRule(catalogingRule) && catalogingRule !== "") {
			throw new Error(`Invalid cataloging rule: ${catalogingRule}`);
		}
		const newValues = structuredClone(values);
		newValues.cataloging_rule = catalogingRule as CatalogingRule;
		setValues(newValues);
	}, [catalogingRule]);

	const [isValid, setIsValid] = useState(false);

	useEffect(() => {}, [values]);

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
