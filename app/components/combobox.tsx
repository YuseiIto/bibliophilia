"use client";

import { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "~/components/ui/command";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";

export interface ComboboxOption {
	value: string;
	label: string;
}

interface ComboboxParams {
	options: ComboboxOption[];
	label?: string;
	notFoundMessage?: string;
	name?: string;
	value?: string;
	onChange?: (value: string) => void;
}

export function Combobox({
	options,
	label,
	notFoundMessage,
	name,
	value,
	onChange,
}: ComboboxParams) {
	if (!options) throw new Error("Options are required.");

	const [open, setOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState(value ?? "");

	useEffect(() => {
		if (onChange) onChange(selectedValue);
	}, [selectedValue]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<input type="hidden" name={name} value={selectedValue} />
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="justify-between w-full"
				>
					{selectedValue
						? options.find((option) => option.value === selectedValue)?.label
						: (label ?? "Select options...")}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0">
				<Command>
					<CommandInput placeholder={label} />
					<CommandList>
						<CommandEmpty>{notFoundMessage ?? "No option found."}</CommandEmpty>
						<CommandGroup>
							{options.map((option) => (
								<CommandItem
									key={option.value}
									value={option.value}
									onSelect={(currentValue) => {
										setSelectedValue(
											currentValue === selectedValue ? "" : currentValue,
										);
										setOpen(false);
									}}
								>
									{option.label}
									<Check
										className={cn(
											"ml-auto",
											selectedValue === option.value
												? "opacity-100"
												: "opacity-0",
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
