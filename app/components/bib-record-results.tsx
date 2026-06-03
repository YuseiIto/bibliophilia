import { useState } from "react";
import { Grid, List } from "@mynaui/icons-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import { SearchResultGrid } from "./search-result-grid";
import { SearchResultList } from "./search-result-list";
import type { BibRecordSummary } from "~/model/bib-record";

export function BibRecordResults({ records }: { records: BibRecordSummary[] }) {
	const [view, setView] = useState<"grid" | "list">("grid");
	return (
		<Tabs value={view} onValueChange={(v) => setView(v as "grid" | "list")}>
			<div className="flex justify-end">
				<TabsList className="mb-4">
					<TabsTrigger value="grid" aria-label="グリッド表示">
						<Grid className="h-4 w-4" />
					</TabsTrigger>
					<TabsTrigger value="list" aria-label="リスト表示">
						<List className="h-4 w-4" />
					</TabsTrigger>
				</TabsList>
			</div>
			<TabsContent value="grid">
				<SearchResultGrid records={records} />
			</TabsContent>
			<TabsContent value="list">
				<SearchResultList records={records} />
			</TabsContent>
		</Tabs>
	);
}
