import type { FormEvent } from "react";
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

import type { TextWithId } from "~/model/text-with-id";

interface LongPluralDialogProps {
	defaultValue?: TextWithId;
	onOpenChange?: (isOpen: boolean) => void;
	onSubmit?: (value: TextWithId) => void;
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
	const [id, setId] = useState(defaultValue?.id ?? null);
	const [value, setValue] = useState(defaultValue?.value ?? "");
	const onSubmitWrapper = (event: FormEvent) => {
		event.preventDefault();
		if (value == "") return; // UIでボタンがDisableされているのでこのケースは考えないことにする
		if (onSubmit) {
			onSubmit({ id, value });
		}

		if (onOpenChange) onOpenChange(false);
		if (clearOnSubmit) {
			setId(defaultValue?.id ?? null);
			setValue(defaultValue?.value ?? "");
		}
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
	value: TextWithId;
	onUpdate?: (value: TextWithId) => void;
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

	const onUpdateWrapper = (value: TextWithId) => {
		if (onUpdate) onUpdate(value);
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<ContextMenu>
				<ContextMenuTrigger asChild>
					<TableRow>
						<TableCell>{value.value}</TableCell>
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
	value?: TextWithId[];
	onChange?: (value: TextWithId[]) => void;
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
	const [values, setValues] = useState<TextWithId[]>(value ?? []);

	const appendValues = ({ id, value }: TextWithId) => {
		const newValues = [...values, { id, value }];
		setValues(newValues);
		if (onChange) onChange(newValues);
	};

	const removeValue = (index: number) => {
		const newValues = [...values];
		newValues.splice(index, 1);
		setValues(newValues);
		if (onChange) onChange(newValues);
	};

	const updateRow = (value: TextWithId, index: number) => {
		const newValues = [...values];
		newValues[index] = { id: value.id, value: value.value };
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
