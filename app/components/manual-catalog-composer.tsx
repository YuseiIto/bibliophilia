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

import { isValidWork } from "~/model/work";

import type { BibRecordDraft } from "~/model/bib-record";
import type { WorkDraft } from "~/model/work";
import type { Identifier } from "~/model/identifier";
import type { AgentDraft } from "~/model/agent";
import type { TitleDraft } from "~/model/title";

import { IdentifierInput } from "~/components/identifier-input";
import { AgentInput } from "~/components/agent-input";
import { TitleInput } from "~/components/titles-input";
import { SubjectInput } from "~/components/subject-input";
import { SeriesTitleInput } from "~/components/series-title-input";
import { LanguagesInput } from "~/components/languages-input";
import { SimplePluralInput } from "~/components/simple-plural-input";
import { LongPluralInput } from "~/components/long-plural-input";

import { v4 as uuidv4 } from "uuid";

interface ManualCatalogComposerProps {
	value?: BibRecordDraft;
	onSubmit?: (data: BibRecordDraft) => void;
}

export function ManualCatalogComposer({
	onSubmit,
	value,
}: ManualCatalogComposerProps) {
	const [id] = useState(value?.work.id ?? uuidv4());
	const [preferredTitle, setPreferredTitle] = useState(
		value?.work.preferred_title ?? "",
	);
	const [preferredTitleTranscription, setPreferredTitleTranscription] =
		useState(value?.work.preferred_title_transcription ?? "");
	const [sourceType, setSourceType] = useState(
		value?.work.catalog_source_type ?? null,
	);
	const [source, setSource] = useState(value?.work.catalog_source ?? "");
	const [preferredVolume, setPreferredVolume] = useState(
		value?.work.preferred_volume ?? "",
	);
	const [catalogingRule, setCatalogingRule] = useState(
		value?.work.cataloging_rule ?? null,
	);
	const [preferredVolumeTitle, setPreferredVolumeTitle] = useState(
		value?.work.preferred_volume_title ?? "",
	);
	const [
		preferredVolumeTitleTranscription,
		setPreferredVolumeTitleTranscription,
	] = useState(value?.work.preferred_title_transcription ?? "");

	const composeWork = (): WorkDraft => {
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

	const [identifiers, setIdentifiers] = useState<Identifier[]>(
		value?.identifiers ?? [],
	);
	const [agents, setAgents] = useState<AgentDraft[]>(value?.agents ?? []);
	const [titles, setTitles] = useState<TitleDraft[]>(value?.titles ?? []);
	const [subjects, setSubjects] = useState(value?.subjects ?? []);
	const [seriesTitles, setSeriesTitles] = useState(value?.seriesTitles ?? []);
	const [languages, setLanguages] = useState(value?.languages ?? []);
	const [prices, setPrices] = useState(value?.prices ?? []);
	const [extents, setExtents] = useState(value?.extents ?? []);
	const [abstracts, setAbstracts] = useState(value?.abstracts ?? []);
	const [descriptions, setDescriptions] = useState(value?.descriptions ?? []);
	const [dates, setDates] = useState(value?.dates ?? []);

	const composeBibRecord = (): BibRecordDraft => {
		return {
			work: composeWork(),
			identifiers,
			agents,
			titles,
			subjects,
			seriesTitles,
			languages,
			prices,
			extents,
			abstracts,
			descriptions,
			dates,
		};
	};

	const onSubmitWrapper = (e: FormEvent) => {
		e.preventDefault();
		if (onSubmit) onSubmit(composeBibRecord());
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

				<IdentifierInput value={identifiers} onChange={setIdentifiers} />
				<AgentInput value={agents} onChange={setAgents} />
				<TitleInput value={titles} onChange={setTitles} />
				<SubjectInput value={subjects} onChange={setSubjects} />
				<SeriesTitleInput value={seriesTitles} onChange={setSeriesTitles} />
				<LanguagesInput value={languages} onChange={setLanguages} />

				<SimplePluralInput
					value={prices}
					onChange={setPrices}
					dialogTitle="価格を追加"
					dialogDescription="資料の入手価格を追加します"
					placeholder="価格を入力"
					dialogButtonLabel="価格を追加"
					createNewButtonLabel="価格を追加"
				/>

				<SimplePluralInput
					value={extents}
					onChange={setExtents}
					dialogTitle="大きさ・容量等を追加"
					dialogDescription="資料の大きさ・容量等を追加します"
					placeholder="大きさ・容量等を入力 (例: &quot;22cm&quot;, &quot;240頁&quot;)"
					dialogButtonLabel="大きさ・容量等を追加"
					createNewButtonLabel="大きさ・容量等を追加"
				/>

				<LongPluralInput
					value={abstracts}
					onChange={setAbstracts}
					dialogTitle="要約・抄録を追加"
					dialogDescription="要約・抄録を追加します"
					placeholder="要約・抄録を入力"
					dialogButtonLabel="要約・抄録を追加"
					createNewButtonLabel="要約・抄録を追加"
				/>

				<LongPluralInput
					value={descriptions}
					onChange={setDescriptions}
					dialogTitle="注記を追加"
					dialogDescription="注記を追加します"
					placeholder="注記を入力"
					dialogButtonLabel="注記を追加"
					createNewButtonLabel="注記を追加"
				/>

				<SimplePluralInput
					value={dates}
					onChange={setDates}
					dialogTitle="日付を追加"
					dialogDescription="刊行日などの日付を表す情報を追加します。原資料の記述に応じて、月や日を省略しても構いません。"
					placeholder="日付を入力 (例: &quot;2021-01-01&quot;, &quot; 平成14年10月&quot;)"
					dialogButtonLabel="日付を追加"
					createNewButtonLabel="日付を追加"
				/>

				<Button
					className="p-2"
					type="submit"
					disabled={!isValidWork(composeWork())}
				>
					<Save /> 保存
				</Button>
			</div>
		</Form>
	);
}
