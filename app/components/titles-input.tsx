import { useState } from "react";
import { Input } from "~/components/ui/input";
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

import { TitleDraft } from "~/model/title";

interface TitleDialogProps {
	defaultValue?: TitleDraft;
	onOpenChange?: (isOpen: boolean) => void;
	onSubmit?: (title: TitleDraft) => void;
	clearOnSubmit?: boolean;
}

export function TitleDialog({
	onOpenChange,
	onSubmit,
	defaultValue,
	clearOnSubmit,
}: TitleDialogProps) {
	const [title, setTitle] = useState<string>(defaultValue?.title ?? "");
	const [transcription, setTranscription] = useState<string>(
		defaultValue?.transcription ?? "",
	);

	const onSubmitWrapper = (event: React.FormEvent) => {
		event.preventDefault();
		if (title == null) return; // UIでボタンがDisableされているのでこのケースは考えないことにする
		if (onSubmit) {
			onSubmit({
				title,
				transcription,
			});
		}

		if (onOpenChange) onOpenChange(false);
		if (clearOnSubmit) {
			setTitle(defaultValue?.title ?? "");
			setTranscription(defaultValue?.transcription ?? "");
		}
	};

	return (
		<DialogContent className="flex flex-col p-3">
			<DialogHeader>
				<DialogTitle> タイトルを追加 </DialogTitle>
				<DialogDescription>
					別タイトルや並列タイトルを追加します。
				</DialogDescription>
			</DialogHeader>
			<div className="flex flex-row">
				<Input
					placeholder="タイトル"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>

			<div className="flex flex-row">
				<Input
					placeholder="タイトルの読み"
					value={transcription}
					onChange={(e) => setTranscription(e.target.value)}
				/>
			</div>
			<Button type="button" onClick={onSubmitWrapper} disabled={title == ""}>
				<Plus /> タイトルを追加
			</Button>
		</DialogContent>
	);
}

interface TitleProps {
	onUpdate?: (title: TitleDraft) => void;
	onDelete?: () => void;
	value: TitleDraft;
}

function TitleRow({ value, onUpdate, onDelete }: TitleProps) {
	const { title, transcription } = value;
	const [isOpen, setIsOpen] = useState(false);

	const onUpdateWrapper = (value: TitleDraft) => {
		if (onUpdate) onUpdate(value);
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<ContextMenu>
				<ContextMenuTrigger asChild>
					<TableRow>
						<TableCell> {title} </TableCell>
						<TableCell> {transcription} </TableCell>
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
			<TitleDialog defaultValue={value} onSubmit={onUpdateWrapper} />
		</Dialog>
	);
}

export function TitleInput() {
	const [isOpen, setIsOpen] = useState(false);
	const [titles, setTitles] = useState<TitleDraft[]>([]);

	const onSubmit = ({ title, transcription }: TitleDraft) => {
		setTitles([...titles, { title, transcription }]);
	};

	const onUpdateRow = ({ title, transcription }: TitleDraft, index: number) => {
		const newTitles = [...titles];
		newTitles[index] = { title, transcription };
		setTitles(newTitles);
	};

	const onDeleteRow = (index: number) => {
		const newTitles = [...titles];
		newTitles.splice(index, 1);
		setTitles(newTitles);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="text-xs font-bold">タイトル</TableHead>
						<TableHead className="text-xs font-bold">タイトルよみ</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{titles.map((title, index) => (
						<TitleRow
							key={index}
							value={title}
							onUpdate={(x) => onUpdateRow(x, index)}
							onDelete={() => onDeleteRow(index)}
						/>
					))}
				</TableBody>
			</Table>
			<DialogTrigger asChild>
				<Button size="sm" variant="outline" className="w-full">
					<Plus /> タイトルを追加
				</Button>
			</DialogTrigger>
			<TitleDialog onOpenChange={setIsOpen} onSubmit={onSubmit} clearOnSubmit />
		</Dialog>
	);
}
