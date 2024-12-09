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

import {
	Identifier,
	IdentifierType,
	identifierTypes,
} from "~/model/identifier";

interface IdentifierDialogProps {
	defaultValue?: Identifier;
	onOpenChange?: (isOpen: boolean) => void;
	onSubmit?: (identifier: Identifier) => void;
}

export function IdentifierDialog({
	onOpenChange,
	onSubmit,
	defaultValue,
}: IdentifierDialogProps) {
	const identifierTypeOptions: ComboboxOption<IdentifierType>[] =
		Object.entries(identifierTypes).map(([value, label]) => ({
			value: value as IdentifierType,
			label,
		}));

	const [identifierType, setIdentifierType] = useState<IdentifierType | null>(
		defaultValue?.identifierType ?? null,
	);
	const [identifier, setIdentifier] = useState<string>(
		defaultValue?.identifier ?? "",
	);

	const onSubmitWrapper = (event: React.FormEvent) => {
		event.preventDefault();
		if (identifierType == null) return; // UIでボタンがDisableされているのでこのケースは考えないことにする
		if (onSubmit) {
			onSubmit({
				identifierType,
				identifier,
			});
		}

		if (onOpenChange) onOpenChange(false);
	};

	return (
		<DialogContent className="flex flex-col p-3">
			<DialogHeader>
				<DialogTitle> 識別子を追加 </DialogTitle>
				<DialogDescription>
					ISBNや各種MARC番号など、資料の識別に使用される符号を指定します。
				</DialogDescription>
			</DialogHeader>
			<Combobox
				label="識別子の種類を選択"
				options={identifierTypeOptions}
				value={identifierType}
				onChange={setIdentifierType}
			/>
			<div className="flex flex-row">
				<Input
					placeholder="識別子を入力"
					value={identifier}
					onChange={(e) => setIdentifier(e.target.value)}
				/>
			</div>

			<Button
				type="button"
				onClick={onSubmitWrapper}
				disabled={identifierType === null || !identifier || identifier === ""}
			>
				<Plus /> 識別子を追加
			</Button>
		</DialogContent>
	);
}

interface IdentifierRowProps {
	onUpdate?: (identifier: Identifier) => void;
	onDelete?: () => void;
	value: Identifier;
}

function IdentifierRow({ value, onUpdate, onDelete }: IdentifierRowProps) {
	const { identifier, identifierType } = value;
	const [isOpen, setIsOpen] = useState(false);

	const onUpdateWrapper = (identifier: Identifier) => {
		if (onUpdate) onUpdate(identifier);
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<ContextMenu>
				<ContextMenuTrigger asChild>
					<TableRow>
						<TableCell> {identifierTypes[identifierType]} </TableCell>
						<TableCell> {identifier} </TableCell>
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
			<IdentifierDialog defaultValue={value} onSubmit={onUpdateWrapper} />
		</Dialog>
	);
}

export function IdentifierInput() {
	const [isOpen, setIsOpen] = useState(false);
	const [identifiers, setIdentifiers] = useState<Identifier[]>([]);

	const onSubmit = ({ identifierType, identifier }: Identifier) => {
		setIdentifiers([...identifiers, { identifierType, identifier }]);
	};

	const onUpdateRow = (
		{ identifier, identifierType }: Identifier,
		index: number,
	) => {
		const newIdentifiers = [...identifiers];
		newIdentifiers[index] = { identifier, identifierType };
		setIdentifiers(newIdentifiers);
	};

	const onDeleteRow = (index: number) => {
		const newIdentifiers = [...identifiers];
		newIdentifiers.splice(index, 1);
		setIdentifiers(newIdentifiers);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="text-xs font-bold">種類</TableHead>
						<TableHead className="text-xs font-bold">識別子</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{identifiers.map((identifier, index) => (
						<IdentifierRow
							key={index}
							value={identifier}
							onUpdate={(x) => onUpdateRow(x, index)}
							onDelete={() => onDeleteRow(index)}
						/>
					))}
				</TableBody>
			</Table>
			<DialogTrigger asChild>
				<Button size="sm" variant="outline" className="w-full">
					<Plus /> 識別子を追加
				</Button>
			</DialogTrigger>
			<IdentifierDialog onOpenChange={setIsOpen} onSubmit={onSubmit} />
		</Dialog>
	);
}
