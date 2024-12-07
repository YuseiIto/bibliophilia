import { Form } from "@remix-run/react";
import { Input } from "./ui/input";

export function ManualCatalogComposer() {
	return (
		<Form method="post" action="/register_manually">
			<div className="flex flex-col gap-3">
			<Input
				placeholder="主に使用するタイトル"
				name="preferred_title"
			></Input>

			<Input
				placeholder="主に使用するタイトルの読み"
				name="prefered_title_transcription"
			></Input>


				/* Selectにする */
			<Input
				placeholder="目録情報の出典"
				name="catalog_source"
			></Input>

				/* Selectにする */
			<Input
				placeholder="目録情報の出典区分"
				name="catalog_source_type"
			></Input>

				/* Selectにする */
			<Input
				placeholder="目録情報の出典区分"
				name="cataloging_rule"
			></Input>


			<Input
				placeholder="サムネイルURL"
				name="thumbnail_url"
			></Input>

			<Input
				placeholder="巻号"
				name="preferred_volume"
			></Input>

			<Input
				placeholder="巻号タイトル"
				name="preferred_volume_title"
			></Input>

			<Input
				placeholder="巻号タイトルよみ"
				name="preferred_volume_title_transcription"
			></Input>
			
				<Input
				placeholder="ISBN-10またはISBN-13 例: 4003107012"
				name="isbn"
			></Input>
			</div>
		</Form>
	);
}
