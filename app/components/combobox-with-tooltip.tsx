import { Combobox, ComboboxOption } from "~/components/combobox";
import {
	TooltipProvider,
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "~/components/ui/tooltip";
import { InfoCircle, DangerTriangle } from "@mynaui/icons-react";
import type { ReactNode } from "react";
import { useState } from "react";

interface ComboboxWithTooltipProps<T extends string> {
	name?: string;
	label: string;
	options: ComboboxOption<T>[];
	children?: ReactNode;
	value?: T | null;
	validator?: (value: T | null) => string | null;
	onChange?: (value: T | null) => void;
}

export function ComboboxWithTooltip<T extends string>({
	name,
	label,
	options,
	children,
	value,
	onChange,
	validator,
}: ComboboxWithTooltipProps<T>) {
	const [errorMessage, setErrorMessage] = useState<string | null>("");

	const onBlur = (data: T | null) => {
		if (validator) {
			const msg = validator(data);
			setErrorMessage(msg);
		}
	};

	return (
		<TooltipProvider>
			<div className="flex flex-col gap-1">
				{errorMessage && (
					<div className="flex flex-row pl-2 items-center text-destructive gap-1">
						<DangerTriangle size={15} />
						<span className="text-xs ">{errorMessage}</span>
					</div>
				)}
				<div className="flex flex-row gap-2 items-center">
					<Combobox
						label={label}
						name={name}
						options={options}
						value={value}
						onChange={onChange}
						onBlur={onBlur}
					/>

					<Tooltip>
						<TooltipTrigger tabIndex={-1} asChild>
							<InfoCircle size={18} />
						</TooltipTrigger>
						<TooltipContent>{children}</TooltipContent>
					</Tooltip>
				</div>
			</div>
		</TooltipProvider>
	);
}
