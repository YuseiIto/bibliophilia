import { useState } from "react";
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
	ContextMenu,
	ContextMenuContent,
	ContextMenuTrigger,
	ContextMenuItem,
} from "~/components/ui/context-menu";

import { Textarea } from "~/components/ui/textarea";

import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";

interface LongPluralDialogProps {
	defaultValue?: string;
	onOpenChange?: (isOpen: boolean) => void;
	onSubmit?: (value: string) => void;
	clearOnSubmit?: boolean;
	dialogTitle?: string;
	dialogDescription?: string;
	placeholder?: string;
	buttonLabel?: string;
}

export function LongPluralDialog({
	defaultValue,
	onOpenChange,
	onSubmit,
	clearOnSubmit,
	dialogTitle,
	dialogDescription,
	placeholder,
	buttonLabel,
}: LongPluralDialogProps) {
	const [value, setValue] = useState(defaultValue ?? "");
	const onSubmitWrapper = (event: React.FormEvent) => {
		event.preventDefault();
		if (value == "") return; // UIでボタンがDisableされているのでこのケースは考えないことにする
		if (onSubmit) {
			onSubmit(value);
		}

		if (onOpenChange) onOpenChange(false);
		if (clearOnSubmit) setValue(defaultValue ?? "");
	};

	return (
		<DialogContent className="flex flex-col p-3">
			<DialogHeader>
				<DialogTitle>{dialogTitle}</DialogTitle>
				<DialogDescription>{dialogDescription}</DialogDescription>
			</DialogHeader>
			<Textarea
				placeholder={placeholder}
				value={value}
				onChange={(event) => setValue(event.target.value)}
			></Textarea>

			<Button type="button" onClick={onSubmitWrapper} disabled={value == ""}>
				<Plus /> {buttonLabel}
			</Button>
		</DialogContent>
	);
}

interface LongPluralItemProps {
	value: string;
	onUpdate?: (value: string) => void;
	onRemove?: () => void;
	dialogTitle?: string;
	dialogDescription?: string;
	placeholder?: string;
	buttonLabel?: string;
}

export function LongPluralItem({
	value,
	onRemove,
	onUpdate,
	dialogTitle,
	dialogDescription,
	placeholder,
	buttonLabel,
}: LongPluralItemProps) {
	const [isOpen, setIsOpen] = useState(false);

	const onUpdateWrapper = (value: string) => {
		if (onUpdate) onUpdate(value);
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<ContextMenu>
				<ContextMenuTrigger asChild>
					<TableRow>
						<TableCell>{value}</TableCell>
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
					<ContextMenuItem onClick={onRemove}>
						<span className="flex flex-row items-center gap-3 text-destructive">
							<Trash size={15} />
							削除
						</span>
					</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
			<LongPluralDialog
				defaultValue={value}
				onSubmit={onUpdateWrapper}
				dialogTitle={dialogTitle}
				dialogDescription={dialogDescription}
				placeholder={placeholder}
				buttonLabel={buttonLabel}
			/>
		</Dialog>
	);
}

interface LongPluralInputProps {
	value?: string[];
	onChange?: (value: string[]) => void;
	dialogTitle?: string;
	dialogDescription?: string;
	placeholder?: string;
	dialogButtonLabel?: string;
	createNewButtonLabel?: string;
}

export function LongPluralInput({
	value,
	onChange,
	dialogTitle,
	dialogDescription,
	placeholder,
	dialogButtonLabel,
	createNewButtonLabel,
}: LongPluralInputProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [values, setValues] = useState<string[]>(value ?? []);

	const appendValues = (value: string) => {
		const newValues = [...values, value];
		setValues(newValues);
		if (onChange) onChange(newValues);
	};

	const removeValue = (index: number) => {
		const newValues = [...values];
		newValues.splice(index, 1);
		setValues(newValues);
		if (onChange) onChange(newValues);
	};

	const updateRow = (value: string, index: number) => {
		const newValues = [...values];
		newValues[index] = value;
		setValues(newValues);
		if (onChange) onChange(newValues);
	};

	return (
		<Dialog onOpenChange={setIsOpen} open={isOpen}>
			<Table>
				<TableBody>
					{values.map((value, index) => (
						<LongPluralItem
							key={index}
							value={value}
							onRemove={() => removeValue(index)}
							onUpdate={(x) => updateRow(x, index)}
							dialogTitle={dialogTitle}
							dialogDescription={dialogDescription}
							placeholder={placeholder}
							buttonLabel={dialogButtonLabel}
						/>
					))}
				</TableBody>
			</Table>
			<DialogTrigger asChild>
				<Button size="sm" variant="outline" className="w-full">
					<Plus /> {createNewButtonLabel}
				</Button>
			</DialogTrigger>
			<LongPluralDialog
				onOpenChange={setIsOpen}
				onSubmit={appendValues}
				dialogTitle={dialogTitle}
				dialogDescription={dialogDescription}
				placeholder={placeholder}
				buttonLabel={dialogButtonLabel}
				clearOnSubmit
			/>
		</Dialog>
	);
}
