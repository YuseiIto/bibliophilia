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

import { Identifier, IdentifierType } from "~/model/identifier";

interface IdentifierDialogProps {
	onOpenChange?: (isOpen: boolean) => void;
	onSubmit?: (identifier: Identifier) => void;
}

export function IdentifierDialog({
	onOpenChange,
	onSubmit,
}: IdentifierDialogProps) {
	const identifierTypeOptions: ComboboxOption<IdentifierType>[] = [
		{
			label: "JP番号(日本全国書誌番号)",
			value: "http://ndl.go.jp/dcndl/terms/JPNO",
		},
	];

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

export function IdentifierInput() {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button size="sm" variant="ghost">
					<Plus /> 識別子を追加
				</Button>
			</DialogTrigger>
			<IdentifierDialog onOpenChange={setIsOpen} />
		</Dialog>
	);
}
