import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import { SearchResultGrid } from "./search-result-grid";
import { SearchResultList } from "./search-result-list";
import type { BibRecordSummary } from "~/model/bib-record";

export function BibRecordResults({ records }: { records: BibRecordSummary[] }) {
	const [view, setView] = useState<"grid" | "list">("grid");
	return (
		<Tabs value={view} onValueChange={(v) => setView(v as "grid" | "list")}>
			<TabsList className="mb-4">
				<TabsTrigger value="grid">⊞ グリッド</TabsTrigger>
				<TabsTrigger value="list">☰ リスト</TabsTrigger>
			</TabsList>
			<TabsContent value="grid">
				<SearchResultGrid records={records} />
			</TabsContent>
			<TabsContent value="list">
				<SearchResultList records={records} />
			</TabsContent>
		</Tabs>
	);
}
