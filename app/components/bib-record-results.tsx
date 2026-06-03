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
					<TabsTrigger value="grid">
						<Grid className="mr-1 h-4 w-4" /> グリッド
					</TabsTrigger>
					<TabsTrigger value="list">
						<List className="mr-1 h-4 w-4" /> リスト
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
