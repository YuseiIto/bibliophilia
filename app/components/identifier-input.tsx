import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Combobox, ComboboxOption } from "~/components/combobox";
import { Button } from "~/components/ui/button";
import { Plus } from "@mynaui/icons-react";
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
	Identifier,
	IdentifierType,
	identifierTypes,
} from "~/model/identifier";

interface IdentifierDialogProps {
	onOpenChange?: (isOpen: boolean) => void;
	onSubmit?: (identifier: Identifier) => void;
}

export function IdentifierDialog({
	onOpenChange,
	onSubmit,
}: IdentifierDialogProps) {
	const identifierTypeOptions: ComboboxOption<IdentifierType>[] =
		Object.entries(identifierTypes).map(([value, label]) => ({ value, label }));

	const [identifierType, setIdentifierType] = useState<IdentifierType | null>(
		null,
	);
	const [identifier, setIdentifier] = useState<string>("");

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
	value: Identifier;
}

function IdentifierRow({ value }: IdentifierRowProps) {
	const { identifier, identifierType } = value;
	return (
		<TableRow>
			<TableCell> {identifierTypes[identifierType]} </TableCell>
			<TableCell> {identifier} </TableCell>
		</TableRow>
	);
}

export function IdentifierInput() {
	const [isOpen, setIsOpen] = useState(false);
	const [identifiers, setIdentifiers] = useState([]);

	const onSubmit = ({ identifierType, identifier }) => {
		setIdentifiers([...identifiers, { identifierType, identifier }]);
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
						<IdentifierRow key={index} value={identifier} />
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
