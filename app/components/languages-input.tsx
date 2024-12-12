import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Plus, X, InfoTriangle, Undo } from "@mynaui/icons-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import { Badge } from "~/components/ui/badge";

import { Combobox } from "~/components/combobox";

import {
	KnownLanguage,
	knownLanguages,
	BibLanguageDraft,
} from "~/model/language";

interface LanguageDialogProps {
	defaultValue?: BibLanguageDraft;
	onOpenChange?: (isOpen: boolean) => void;
	onSubmit?: (value: BibLanguageDraft) => void;
	clearOnSubmit?: boolean;
}

export function LanguageDialog({
	defaultValue,
	onOpenChange,
	onSubmit,
	clearOnSubmit,
}: LanguageDialogProps) {
	const [id, setId] = useState(defaultValue?.id ?? null);
	const [language, setLanguage] = useState<KnownLanguage | string>(
		defaultValue?.language ?? "",
	);
	const [useOptions, setUseOptions] = useState(
		language in knownLanguages || language == "",
	);
	const languageOptions = Object.entries(knownLanguages).map(
		([key, value]) => ({
			value: key,
			label: value,
		}),
	);

	const onSubmitWrapper = (event: React.FormEvent) => {
		event.preventDefault();
		if (language == "") return; // UIでボタンがDisableされているのでこのケースは考えないことにする
		if (onSubmit) {
			onSubmit({
				language,
				id,
			});
		}

		if (onOpenChange) onOpenChange(false);
		if (clearOnSubmit) {
			setId(defaultValue?.id ?? null);
			setLanguage(defaultValue?.language ?? "");
			setUseOptions(language in knownLanguages || language == "");
		}
	};

	return (
		<DialogContent className="flex flex-col p-3">
			<DialogHeader>
				<DialogTitle>言語を追加</DialogTitle>
				<DialogDescription>
					選択肢から選択した言語は、IETF BCP47形式で保存されます。
				</DialogDescription>
			</DialogHeader>
			{useOptions ? (
				<Combobox
					options={languageOptions}
					label="言語を選択"
					value={language}
					onChange={(x) => setLanguage(x ?? "")}
				/>
			) : (
				<Input
					placeholder="言語を入力 （例: &quot;Newspeak&quot;）"
					value={language}
					onChange={(event) => setLanguage(event.target.value)}
				/>
			)}

			<div className="flex flex-row p-0 pr-3 gap-1 justify-end hover:underline">
				{useOptions ? <InfoTriangle size={14} /> : <Undo size={14} />}
				<button className="text-xs" onClick={() => setUseOptions(!useOptions)}>
					{useOptions ? "言語が選択肢にないとき" : "リストに戻る"}
				</button>
			</div>

			<Button type="button" onClick={onSubmitWrapper} disabled={language == ""}>
				<Plus /> 言語を追加
			</Button>
		</DialogContent>
	);
}

interface LanguageItemProps {
	value: BibLanguageDraft;
	onRemove: () => void;
}

export function LanguageItem({ value, onRemove }: LanguageItemProps) {
	const [showX, setShowX] = useState(false);
	const label =
		knownLanguages[value.language as KnownLanguage] ?? value.language;
	return (
		<Badge
			className="flex flex-row gap-1"
			onMouseEnter={() => setShowX(true)}
			onMouseLeave={() => setShowX(false)}
			variant="secondary"
		>
			{label}
			{showX ? <X size={15} onClick={onRemove} /> : null}
		</Badge>
	);
}

interface LanguagesInputProps {
	value: BibLanguageDraft[];
	onChange: (value: BibLanguageDraft[]) => void;
}

export function LanguagesInput({ value, onChange }: LanguagesInputProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [languages, setLanguages] = useState<BibLanguageDraft[]>(value ?? []);

	const appendLanguage = (value: BibLanguageDraft) => {
		const newLanguages = [...languages, value];
		setLanguages(newLanguages);
		if (onChange) onChange(newLanguages);
	};

	const removeLanguage = (index: number) => {
		const newLanguages = [...languages];
		newLanguages.splice(index, 1);
		setLanguages(newLanguages);
		if (onChange) onChange(newLanguages);
	};

	return (
		<Dialog onOpenChange={setIsOpen} open={isOpen}>
			<div className="flex flex-row gap-3">
				{languages.map((language, index) => (
					<LanguageItem
						key={index}
						value={language}
						onRemove={() => removeLanguage(index)}
					/>
				))}
			</div>
			<DialogTrigger asChild>
				<Button size="sm" variant="outline" className="w-full">
					<Plus /> 言語を追加
				</Button>
			</DialogTrigger>
			<LanguageDialog
				onOpenChange={setIsOpen}
				onSubmit={appendLanguage}
				clearOnSubmit
			/>
		</Dialog>
	);
}
