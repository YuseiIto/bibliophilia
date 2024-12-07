import { InputWithTooltip } from "~/components/input-with-tooltip";

export function PreferredTitleInput() {
	return (
		<InputWithTooltip placeholder="優先タイトル" name="preferred_title">
			<div className="flex flex-col p-2">
				<h4 className="font-bold text-sm"> 優先タイトル </h4>
				<p>
					タイトル（資料の名称）の典拠形であるもの。
					<br /> 通常、資料の名称のうちの主たるものを指定します。
				</p>
			</div>
		</InputWithTooltip>
	);
}
