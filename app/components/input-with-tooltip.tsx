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
	onChange?: (value: string) => void;
	value?: string;
}

export function InputWithTooltip({
	name,
	placeholder,
	children,
	onChange,
	value,
}: InputWithTooltipProps) {
	const onChangeWrapper = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) onChange(e.target.value);
	};

	return (
		<TooltipProvider>
			<div className="flex flex-row gap-2 items-center">
				<Input
					placeholder={placeholder}
					name={name}
					value={value}
					onChange={onChangeWrapper}
				></Input>

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
