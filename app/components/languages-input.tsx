import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Plus, X } from "@mynaui/icons-react";
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

import { KnownLanguage, knownLanguages } from "~/model/language";

interface LanguageDialogProps {
	defaultValue?: KnownLanguage | string;
	onOpenChange?: (isOpen: boolean) => void;
	onSubmit?: (language: KnownLanguage | string) => void;
	clearOnSubmit?: boolean;
}

export function LanguageDialog({
	defaultValue,
	onOpenChange,
	onSubmit,
	clearOnSubmit,
}: LanguageDialogProps) {
	const [language, setLanguage] = useState<KnownLanguage>(defaultValue ?? "");
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
			onSubmit(language);
		}

		if (onOpenChange) onOpenChange(false);
		if (clearOnSubmit) {
			setLanguage(defaultValue ?? "");
		}
	};

	return (
		<DialogContent className="flex flex-col p-3">
			<DialogHeader>
				<DialogTitle>言語を追加</DialogTitle>
				<DialogDescription>
					選択肢から選択した言語は、IETF
					BCP47形式で保存されます。選択肢にない言語を直接入力することもできます。
				</DialogDescription>
			</DialogHeader>

			<Combobox
				options={languageOptions}
				label="言語"
				value={language}
				onChange={setLanguage}
			/>
			<Button type="button" onClick={onSubmitWrapper} disabled={language == ""}>
				<Plus /> 言語を追加
			</Button>
		</DialogContent>
	);
}

interface LanguageItemProps {
	language: KnownLanguage | string;
	onRemove: () => void;
}

export function LanguageItem({ language, onRemove }: LanguageItemProps) {
	const [showX, setShowX] = useState(false);
	const label = knownLanguages[language] ?? language;
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

export function LanguagesInput() {
	const [isOpen, setIsOpen] = useState(false);
	const [languages, setLanguages] = useState([]);

	const appendLanguage = (language: KnownLanguage | string) => {
		setLanguages([...languages, language]);
	};

	const removeLanguage = (index: number) => {
		const newLanguages = [...languages];
		newLanguages.splice(index, 1);
		setLanguages(newLanguages);
	};

	return (
		<Dialog onOpenChange={setIsOpen} open={isOpen}>
			<div className="flex flex-row gap-3">
				{languages.map((language, index) => (
					<LanguageItem
						key={index}
						language={language}
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
