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
}

export function ComboboxWithTooltip({
	name,
	label,
	options,
	children,
}: ComboboxWithTooltipProps) {
	return (
		<TooltipProvider>
			<div className="flex flex-row gap-2 items-center">
				<Combobox
					label={label}
					name={name}
					options={options}
				/>

				<Tooltip>
					<TooltipTrigger tabIndex={-1}>
						<InfoCircle size={18} />
					</TooltipTrigger>
					<TooltipContent>{children}</TooltipContent>
				</Tooltip>
			</div>
		</TooltipProvider>
	);
}
