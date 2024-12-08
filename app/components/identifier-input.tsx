import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Combobox } from "~/components/combobox";
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

interface IdentifierDialogProps {
	onOpenChange: (isOpen: boolean) => void;
}

export function IdentifierDialog({ onOpenChange }: IdentifierDialogProps) {
	const identifierTypeOptions = [
		{
			label: "JP番号(日本全国書誌番号)",
			value: "http://ndl.go.jp/dcndl/terms/JPNO",
		},
	];

	const onSave = (event: React.FormEvent) => {
		event.preventDefault();
		onOpenChange(false);
	};

	return (
		<DialogContent className="flex flex-col p-3">
			<DialogHeader>
				<DialogTitle> 識別子を追加 </DialogTitle>
				<DialogDescription>
					ISBNや各種MARC番号など、資料の識別に使用される符号を指定します。
				</DialogDescription>
			</DialogHeader>
				<Combobox label="識別子の種類を選択" options={identifierTypeOptions} />
				<div className="flex flex-row">
					<Input />
				</div>

				<Button type="button" onClick={onSave}>
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
