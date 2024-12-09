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

import { SeriesTitleDraft } from "~/model/series-title";

interface SeriesTitleDialogProps {
	defaultValue?: SeriesTitleDraft;
	onOpenChange?: (isOpen: boolean) => void;
	onSubmit?: (title: SeriesTitleDraft) => void;
	clearOnSubmit?: boolean;
}

export function SeriesTitleDialog({
	onOpenChange,
	onSubmit,
	defaultValue,
	clearOnSubmit,
}: SeriesTitleDialogProps) {
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
				<DialogTitle> シリーズタイトルを追加 </DialogTitle>
				<DialogDescription>
					シリーズタイトル（叢書名）を追加します。
				</DialogDescription>
			</DialogHeader>
			<div className="flex flex-row">
				<Input
					placeholder="シリーズタイトル"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>

			<div className="flex flex-row">
				<Input
					placeholder="シリーズタイトルの読み"
					value={transcription}
					onChange={(e) => setTranscription(e.target.value)}
				/>
			</div>
			<Button type="button" onClick={onSubmitWrapper} disabled={title == ""}>
				<Plus /> シリーズタイトルを追加
			</Button>
		</DialogContent>
	);
}

interface SeriesTitleProps {
	onUpdate?: (title: SeriesTitleDraft) => void;
	onDelete?: () => void;
	value: SeriesTitleDraft;
}

function SeriesTitleRow({ value, onUpdate, onDelete }: SeriesTitleProps) {
	const { title, transcription } = value;
	const [isOpen, setIsOpen] = useState(false);

	const onUpdateWrapper = (value: SeriesTitleDraft) => {
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
			<SeriesTitleDialog defaultValue={value} onSubmit={onUpdateWrapper} />
		</Dialog>
	);
}

export function SeriesTitleInput() {
	const [isOpen, setIsOpen] = useState(false);
	const [seriesTitles, setSeriesTitles] = useState<SeriesTitleDraft[]>([]);

	const onSubmit = ({ title, transcription }: SeriesTitleDraft) => {
		setSeriesTitles([...seriesTitles, { title, transcription }]);
	};

	const onUpdateRow = (
		{ title, transcription }: SeriesTitleDraft,
		index: number,
	) => {
		const newSeriesTitles = [...seriesTitles];
		newSeriesTitles[index] = { title, transcription };
		setSeriesTitles(newSeriesTitles);
	};

	const onDeleteRow = (index: number) => {
		const newSeriesTitles = [...seriesTitles];
		newSeriesTitles.splice(index, 1);
		setSeriesTitles(newSeriesTitles);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="text-xs font-bold">
							シリーズタイトル
						</TableHead>
						<TableHead className="text-xs font-bold">
							シリーズタイトルよみ
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{seriesTitles.map((seriesTitle, index) => (
						<SeriesTitleRow
							key={index}
							value={seriesTitle}
							onUpdate={(x) => onUpdateRow(x, index)}
							onDelete={() => onDeleteRow(index)}
						/>
					))}
				</TableBody>
			</Table>
			<DialogTrigger asChild>
				<Button size="sm" variant="outline" className="w-full">
					<Plus /> シリーズタイトルを追加
				</Button>
			</DialogTrigger>
			<SeriesTitleDialog
				onOpenChange={setIsOpen}
				onSubmit={onSubmit}
				clearOnSubmit
			/>
		</Dialog>
	);
}
