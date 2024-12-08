import { Combobox, ComboboxOption } from "~/components/combobox";
import type { CatalogingRule } from "~/model/work";

interface CatalogingRuleInputProps {
	value?: CatalogingRule | null;
	onChange?: (value: CatalogingRule | null) => void;
}

export function CatalogingRuleInput({
	onChange,
	value,
}: CatalogingRuleInputProps) {
	const catalogingRules: ComboboxOption<CatalogingRule>[] = [
		{
			label: "日本目録規則2018年版 (NCR2018)",
			value: "ncr/2018",
		},
		{
			label: "日本目録規則1987年版 (NCR1987)",
			value: "ncr/1987",
		},
		{
			label: "日本目録規則1977年版 (NCR1977)",
			value: "ncr/1977",
		},
		{
			label: "日本目録規則 (NCR)",
			value: "ncr",
		},
		{
			label: "国立国会図書館逐次刊行物目録規則",
			value: "ndlserial",
		},
		{
			label: "RDA (Resource Description and Access)",
			value: "rda",
		},
		{
			label: "AACR (Anglo-American Cataloging Rules)",
			value: "aacr",
		},
	];

	return (
		<Combobox
			options={catalogingRules}
			value={value}
			onChange={onChange}
			name="cataloging_rule"
			label="目録規則を選択"
		/>
	);
}
