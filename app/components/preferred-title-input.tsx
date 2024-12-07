import { Input } from "~/components/ui/input";
import {
	TooltipProvider,
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "~/components/ui/tooltip";
import { InfoCircle } from "@mynaui/icons-react";

export function PreferredTitleInput() {
	return (
		<TooltipProvider>
			<div className="flex flex-row gap-2 items-center">
				<Input
					placeholder="優先タイトル"
					id="preferred_title"
					name="preferred_title"
				></Input>

				<Tooltip>
					<TooltipTrigger tabIndex={-1}>
						<InfoCircle size={18} />
					</TooltipTrigger>
					<TooltipContent>
						<div className="flex flex-col p-2">
							<h4 className="font-bold text-sm"> 優先タイトル </h4>
							<p>
								タイトル（資料の名称）の典拠形であるもの。
								<br /> 通常、資料の名称のうちの主たるものを指定します。
							</p>
						</div>
					</TooltipContent>
				</Tooltip>
			</div>
		</TooltipProvider>
	);
}
