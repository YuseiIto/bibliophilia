import { ReactNode, useState } from "react";
import { Input } from "~/components/ui/input";
import {
	TooltipProvider,
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "~/components/ui/tooltip";
import { InfoCircle, DangerTriangle } from "@mynaui/icons-react";

interface InputWithTooltipProps {
	name?: string;
	placeholder?: string;
	children?: ReactNode;
	onChange?: (value: string) => void;
	validator?: (value: string) => string | null;
	value?: string;
}

export function InputWithTooltip({
	name,
	placeholder,
	children,
	onChange,
	validator,
	value,
}: InputWithTooltipProps) {
	const onChangeWrapper = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) onChange(e.target.value);
	};

	const [errorMessage, setErrorMessage] = useState<string | null>("");
	const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
		const data = e.target.value;
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
					<Input
						placeholder={placeholder}
						name={name}
						value={value}
						onChange={onChangeWrapper}
						onBlur={onBlur}
					></Input>
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
