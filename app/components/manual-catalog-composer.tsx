import { useState, FormEvent } from "react";
import { Form } from "@remix-run/react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

import { Save } from "@mynaui/icons-react";

import { PreferredTitleInput } from "~/components/preferred-title-input";
import { CatalogingRuleInput } from "~/components/cataloging-rule-input";
import { CatalogSourceInput } from "~/components/catalog-source-input";
import { PreferredVolumeInput } from "~/components/preferred-volume-input";
import { PreferredVolumeTitleInput } from "~/components/preferred-volume-title-input";

import { WorkDraft, isValidWork } from "~/model/work";
import { IdentifierInput } from "~/components/identifier-input";
import { AgentInput } from "~/components/agent-input";
import { TitleInput } from "~/components/titles-input";
import { SubjectInput } from "~/components/subject-input";
import { SeriesTitleInput } from "~/components/series-title-input";

import { v4 as uuidv4 } from "uuid";

interface ManualCatalogComposerProps {
	value?: WorkDraft;
	onSubmit?: (data: WorkDraft) => void;
}

export function ManualCatalogComposer({
	onSubmit,
	value,
}: ManualCatalogComposerProps) {
	const [id] = useState(value?.id ?? uuidv4());
	const [preferredTitle, setPreferredTitle] = useState(
		value?.preferred_title ?? "",
	);
	const [preferredTitleTranscription, setPreferredTitleTranscription] =
		useState(value?.preferred_title_transcription ?? "");
	const [sourceType, setSourceType] = useState(
		value?.catalog_source_type ?? null,
	);
	const [source, setSource] = useState(value?.catalog_source ?? "");
	const [preferredVolume, setPreferredVolume] = useState(
		value?.preferred_volume ?? "",
	);
	const [catalogingRule, setCatalogingRule] = useState(
		value?.cataloging_rule ?? null,
	);
	const [preferredVolumeTitle, setPreferredVolumeTitle] = useState(
		value?.preferred_volume_title ?? "",
	);
	const [
		preferredVolumeTitleTranscription,
		setPreferredVolumeTitleTranscription,
	] = useState(value?.preferred_title_transcription ?? "");

	const composeValues = () => {
		return {
			id,
			preferred_title: preferredTitle,
			preferred_title_transcription: preferredTitleTranscription,
			catalog_source_type: sourceType,
			catalog_source: source,
			preferred_volume: preferredVolume,
			preferred_volume_title: preferredVolumeTitle,
			preferred_volume_title_transcription: preferredVolumeTitleTranscription,
			cataloging_rule: catalogingRule,
			thumbnail_url: null,
		};
	};

	const onSubmitWrapper = (e: FormEvent) => {
		e.preventDefault();
		if (onSubmit) onSubmit(composeValues());
	};

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

				<IdentifierInput />
				<AgentInput />
				<TitleInput />
				<SubjectInput />
				<SeriesTitleInput />

				<Button
					className="p-2"
					type="submit"
					disabled={!isValidWork(composeValues())}
				>
					<Save /> 保存
				</Button>
			</div>
		</Form>
	);
}
