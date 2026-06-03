import type { ReactNode } from "react";
import { BookCover } from "./book-cover";
import { identifierTypes, type IdentifierType } from "~/model/identifier";
import { PUBLISHER_ROLE } from "~/model/agent";
import type { BibRecordDetail } from "~/model/bib-record";

function SidebarSection({ title, children }: { title: string; children: ReactNode }) {
	return (
		<div className="mt-4">
			<h2 className="text-xs font-bold uppercase tracking-wide text-muted-foreground border-b pb-0.5 mb-1">
				{title}
			</h2>
			<div className="text-sm">{children}</div>
		</div>
	);
}

export function BibDetailSidebar({ record }: { record: BibRecordDetail }) {
	const publisher = record.agents.find((a) => a.role === PUBLISHER_ROLE)?.preferred_name;
	const hasPublication =
		Boolean(publisher) ||
		record.dates.length > 0 ||
		record.prices.length > 0 ||
		record.extents.length > 0;

	return (
		<aside className="w-[120px] flex-none">
			<BookCover identifiers={record.identifiers} className="h-[168px] w-[120px]" />

			{record.identifiers.length > 0 && (
				<SidebarSection title="識別子">
					{record.identifiers.map((i, idx) => (
						<div key={idx}>
							{identifierTypes[i.identifier_type as IdentifierType] ?? i.identifier_type}: {i.identifier}
						</div>
					))}
				</SidebarSection>
			)}
			{hasPublication && (
				<SidebarSection title="出版・刊行">
					{publisher && <div>{publisher}</div>}
					{record.dates.length > 0 && <div>{record.dates.join(", ")}</div>}
					{record.prices.length > 0 && <div>{record.prices.join(", ")}</div>}
					{record.extents.length > 0 && <div>{record.extents.join(", ")}</div>}
				</SidebarSection>
			)}
			{record.languages.length > 0 && (
				<SidebarSection title="言語">{record.languages.join(", ")}</SidebarSection>
			)}
		</aside>
	);
}
