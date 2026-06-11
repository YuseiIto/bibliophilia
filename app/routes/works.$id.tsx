import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { useLoaderData } from "react-router";
import { SidebarOnlyLayout } from "~/layouts/sidebar-only";
import { ErrorPage } from "~/components/error-page";
import { BookCover } from "~/components/book-cover";
import { BibDetailMain } from "~/components/bib-detail-main";
import { BibDetailRawTable } from "~/components/bib-detail-raw-table";
import { Repository } from "~/db";

export const meta: MetaFunction<typeof loader> = ({ data }) => [
	{ title: data ? `${data.preferred_title} - Bibliophilia` : "Bibliophilia" },
];

export async function loader({ context, params }: LoaderFunctionArgs) {
	const id = params.id;
	if (!id)
		throw new Response("Not Found", { status: 404, statusText: "Not Found" });
	const db = Repository.fromEnv(context.cloudflare.env);
	const record = await db.getBibRecordDetail(id);
	if (!record)
		throw new Response("Not Found", { status: 404, statusText: "Not Found" });
	return record;
}

export default function WorkDetail() {
	const record = useLoaderData<typeof loader>();
	return (
		<SidebarOnlyLayout>
			<div className="mx-auto max-w-4xl px-4 py-6">
				<div className="flex gap-6 items-start">
					<BookCover
						identifiers={record.identifiers}
						className="h-[210px] w-[150px] flex-none"
					/>
					<BibDetailMain record={record} />
				</div>
				<BibDetailRawTable record={record} />
			</div>
		</SidebarOnlyLayout>
	);
}

export function ErrorBoundary() {
	return <ErrorPage />;
}
