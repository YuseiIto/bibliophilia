import { Input } from "~/components/ui/input";
import {
	TooltipProvider,
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "~/components/ui/tooltip";
import { InfoCircle } from "@mynaui/icons-react";

interface InputWithTooltipProps {
	name?: string;
	placeholder?: string;
	children?: ReactNode;
}

export function InputWithTooltip({
	name,
	placeholder,
	children,
}: InputWithTooltipProps) {
	return (
		<TooltipProvider>
			<div className="flex flex-row gap-2 items-center">
				<Input placeholder={placeholder} name={name}></Input>

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
