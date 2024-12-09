import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Combobox, ComboboxOption } from "~/components/combobox";
import { Button } from "~/components/ui/button";
import { Plus, Edit, Trash } from "@mynaui/icons-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";

import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuTrigger,
	ContextMenuItem,
} from "~/components/ui/context-menu";

import { SubjectDraft, SubjectType, subjectTypes } from "~/model/subject";

interface SubjectDialogProps {
	defaultValue?: SubjectDraft;
	onOpenChange?: (isOpen: boolean) => void;
	onSubmit?: (subject: SubjectDraft) => void;
	clearOnSubmit?: boolean;
}

export function SubjectDialog({
	onOpenChange,
	onSubmit,
	defaultValue,
	clearOnSubmit,
}: SubjectDialogProps) {
	const subjectTypeOptions: ComboboxOption<SubjectType>[] = Object.entries(
		subjectTypes,
	).map(([value, label]) => ({ value: value as SubjectType, label }));

	const [subjectType, setSubjectType] = useState<SubjectType | null>(
		defaultValue?.subject_type ?? null,
	);
	const [preferredLabel, setPreferredLabel] = useState<string>(
		defaultValue?.preferred_label ?? "",
	);

	const [preferredLabelTranscription, setPreferredLabelTranscription] =
		useState<string>(defaultValue?.preferred_label_transcription ?? "");

	const onSubmitWrapper = (event: React.FormEvent) => {
		event.preventDefault();
		if (subjectType == null) return; // UIでボタンがDisableされているのでこのケースは考えないことにする
		if (onSubmit) {
			onSubmit({
				subject_type: subjectType,
				preferred_label: preferredLabel,
				preferred_label_transcription: preferredLabelTranscription,
			});
		}

		if (onOpenChange) onOpenChange(false);
		if (clearOnSubmit) {
			setSubjectType(defaultValue?.subject_type ?? null);
			setPreferredLabel(defaultValue?.preferred_label ?? "");
			setPreferredLabelTranscription(
				defaultValue?.preferred_label_transcription ?? "",
			);
		}
	};

	return (
		<DialogContent className="flex flex-col p-3">
			<DialogHeader>
				<DialogTitle> 件名・分類を追加 </DialogTitle>
				<DialogDescription>
					件名標目や分類の情報を追加します。
				</DialogDescription>
			</DialogHeader>
			<Combobox
				label="件名・分類の種類を選択"
				options={subjectTypeOptions}
				value={subjectType}
				onChange={setSubjectType}
			/>
			<div className="flex flex-row">
				<Input
					placeholder="件名を入力"
					value={preferredLabel}
					onChange={(e) => setPreferredLabel(e.target.value)}
				/>
			</div>
			<div className="flex flex-row">
				<Input
					placeholder="件名の読みを入力"
					value={preferredLabelTranscription}
					onChange={(e) => setPreferredLabelTranscription(e.target.value)}
				/>
			</div>
			<Button
				type="button"
				onClick={onSubmitWrapper}
				disabled={subjectType === null || preferredLabel === ""}
			>
				<Plus /> 件名・分類を追加
			</Button>
		</DialogContent>
	);
}

interface SubjectRowProps {
	onUpdate?: (subject: SubjectDraft) => void;
	onDelete?: () => void;
	value: SubjectDraft;
}

function SubjectRow({ value, onUpdate, onDelete }: SubjectRowProps) {
	const { subject_type, preferred_label } = value;
	const [isOpen, setIsOpen] = useState(false);

	const onUpdateWrapper = (subject: SubjectDraft) => {
		if (onUpdate) onUpdate(subject);
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<ContextMenu>
				<ContextMenuTrigger asChild>
					<TableRow>
						<TableCell> {subjectTypes[subject_type]} </TableCell>
						<TableCell> {preferred_label} </TableCell>
					</TableRow>
				</ContextMenuTrigger>
				<ContextMenuContent>
					<DialogTrigger asChild>
						<ContextMenuItem>
							<span className="flex flex-row items-center gap-3">
								<Edit size={15} />
								編集
							</span>
						</ContextMenuItem>
					</DialogTrigger>
					<ContextMenuItem onClick={onDelete}>
						<span className="flex flex-row items-center gap-3 text-destructive">
							<Trash size={15} />
							削除
						</span>
					</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
			<SubjectDialog defaultValue={value} onSubmit={onUpdateWrapper} />
		</Dialog>
	);
}

export function SubjectInput() {
	const [isOpen, setIsOpen] = useState(false);
	const [subjects, setSubjects] = useState<SubjectDraft[]>([]);

	const onSubmit = ({
		subject_type,
		preferred_label,
		preferred_label_transcription,
	}: SubjectDraft) => {
		setSubjects([
			...subjects,
			{ subject_type, preferred_label, preferred_label_transcription },
		]);
	};

	const onUpdateRow = (
		{
			subject_type,
			preferred_label,
			preferred_label_transcription,
		}: SubjectDraft,
		index: number,
	) => {
		const newSubjects = [...subjects];
		newSubjects[index] = {
			subject_type,
			preferred_label,
			preferred_label_transcription,
		};
		setSubjects(newSubjects);
	};

	const onDeleteRow = (index: number) => {
		const newSubjects = [...subjects];
		newSubjects.splice(index, 1);
		setSubjects(newSubjects);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="text-xs font-bold">種類</TableHead>
						<TableHead className="text-xs font-bold">件名・分類</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{subjects.map((subject, index) => (
						<SubjectRow
							key={index}
							value={subject}
							onUpdate={(x) => onUpdateRow(x, index)}
							onDelete={() => onDeleteRow(index)}
						/>
					))}
				</TableBody>
			</Table>
			<DialogTrigger asChild>
				<Button size="sm" variant="outline" className="w-full">
					<Plus /> 件名・分類を追加
				</Button>
			</DialogTrigger>
			<SubjectDialog
				onOpenChange={setIsOpen}
				onSubmit={onSubmit}
				clearOnSubmit
			/>
		</Dialog>
	);
}
