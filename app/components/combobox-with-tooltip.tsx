import { Combobox, ComboboxOption } from "~/components/combobox";
import {
	TooltipProvider,
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "~/components/ui/tooltip";
import { InfoCircle } from "@mynaui/icons-react";

interface ComboboxWithTooltipProps {
	name?: string;
	label: string;
	options: ComboboxOption[];
	children?: ReactNode;
	value?: string;
	onChange?: (value: string) => void;
}

export function ComboboxWithTooltip({
	name,
	label,
	options,
	children,
	value,
	onChange,
}: ComboboxWithTooltipProps) {
	return (
		<TooltipProvider>
			<div className="flex flex-row gap-2 items-center">
				<Combobox
					label={label}
					name={name}
					options={options}
					value={value}
					onChange={onChange}
				/>

				<Tooltip>
					<TooltipTrigger tabIndex={-1} asChild>
						<InfoCircle size={18} />
					</TooltipTrigger>
					<TooltipContent>{children}</TooltipContent>
				</Tooltip>
			</div>
		</TooltipProvider>
	);
}
