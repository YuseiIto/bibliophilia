import type { FormEvent } from "react";
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
import type { TextWithId } from "~/model/text-with-id";

interface SimplePluralDialogProps {
	defaultValue?: TextWithId;
	onOpenChange?: (isOpen: boolean) => void;
	onSubmit?: (value: TextWithId) => void;
	clearOnSubmit?: boolean;
	dialogTitle?: string;
	dialogDescription?: string;
	placeholder?: string;
	buttonLabel?: string;
}

export function SimplePluralDialog({
	defaultValue,
	onOpenChange,
	onSubmit,
	clearOnSubmit,
	dialogTitle,
	dialogDescription,
	placeholder,
	buttonLabel,
}: SimplePluralDialogProps) {
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
			<Input
				placeholder={placeholder}
				value={value}
				onChange={(event) => setValue(event.target.value)}
			/>

			<Button type="button" onClick={onSubmitWrapper} disabled={value == ""}>
				<Plus /> {buttonLabel}
			</Button>
		</DialogContent>
	);
}

interface SimplePluralItemProps {
	value: TextWithId;
	onRemove: () => void;
}

export function SimplePluralItem({ value, onRemove }: SimplePluralItemProps) {
	const [showX, setShowX] = useState(false);

	return (
		<Badge
			className="flex flex-row gap-1"
			onMouseEnter={() => setShowX(true)}
			onMouseLeave={() => setShowX(false)}
			variant="secondary"
		>
			{value.value}
			{showX ? <X size={15} onClick={onRemove} /> : null}
		</Badge>
	);
}

interface SimplePluralInputProps {
	value?: TextWithId[];
	onChange?: (value: TextWithId[]) => void;
	dialogTitle?: string;
	dialogDescription?: string;
	placeholder?: string;
	dialogButtonLabel?: string;
	createNewButtonLabel?: string;
}

export function SimplePluralInput({
	dialogTitle,
	dialogDescription,
	placeholder,
	dialogButtonLabel,
	createNewButtonLabel,
	value,
	onChange,
}: SimplePluralInputProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [values, setValues] = useState<TextWithId[]>(value ?? []);

	const appendValue = (value: TextWithId) => {
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

	return (
		<Dialog onOpenChange={setIsOpen} open={isOpen}>
			<div className="flex flex-row gap-3">
				{values.map((value, index) => (
					<SimplePluralItem
						key={index}
						value={value}
						onRemove={() => removeValue(index)}
					/>
				))}
			</div>
			<DialogTrigger asChild>
				<Button size="sm" variant="outline" className="w-full">
					<Plus /> {createNewButtonLabel}
				</Button>
			</DialogTrigger>
			<SimplePluralDialog
				onOpenChange={setIsOpen}
				onSubmit={appendValue}
				dialogTitle={dialogTitle}
				dialogDescription={dialogDescription}
				placeholder={placeholder}
				buttonLabel={dialogButtonLabel}
				clearOnSubmit
			/>
		</Dialog>
	);
}
