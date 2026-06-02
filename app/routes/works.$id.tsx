import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { useLoaderData } from "react-router";
import { SidebarOnlyLayout } from "~/layouts/sidebar-only";
import { ErrorPage } from "~/components/error-page";
import { BibDetailSidebar } from "~/components/bib-detail-sidebar";
import { BibDetailMain } from "~/components/bib-detail-main";
import { BibDetailRawTable } from "~/components/bib-detail-raw-table";
import { Repository } from "~/db";

export const meta: MetaFunction<typeof loader> = ({ data }) => [
	{ title: data ? `${data.preferred_title} - Bibliophilia` : "Bibliophilia" },
];

export async function loader({ context, params }: LoaderFunctionArgs) {
	const id = params.id;
	if (!id) throw new Response("Not Found", { status: 404 });
	const db = Repository.fromEnv(context.cloudflare.env);
	const record = await db.getBibRecordDetail(id);
	if (!record) throw new Response("Not Found", { status: 404 });
	return record;
}

export default function WorkDetail() {
	const record = useLoaderData<typeof loader>();
	return (
		<SidebarOnlyLayout>
			<div className="container mx-auto py-6">
				<div className="flex gap-6 items-start">
					<BibDetailSidebar record={record} />
					<div className="flex-1 min-w-0">
						<BibDetailMain record={record} />
						<BibDetailRawTable record={record} />
					</div>
				</div>
			</div>
		</SidebarOnlyLayout>
	);
}

export function ErrorBoundary() {
	return <ErrorPage />;
}
