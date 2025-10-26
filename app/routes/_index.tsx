import type { MetaFunction, LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "@remix-run/react";
import logo from "~/assets/logo.png";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { SidebarOnlyLayout } from "~/layouts/sidebar-only";
import { BibThumbnailItem } from "~/components/bib-thumbnail-item";
import { Repository } from "~/db";

export const meta: MetaFunction = () => {
	return [
		{ title: "Bibliophilia" },
		{
			name: "description",
			content: "Yet another information resource manager and more.",
		},
	];
};

export async function loader({ context }: LoaderFunctionArgs) {
	const db = new Repository(context.cloudflare.env);
	const data = await db.getAllBibRecords();
	return {
		data,
	};
}

export default function Index() {
	const { data } = useLoaderData<typeof loader>();
	console.log(data);

	return (
		<SidebarOnlyLayout>
			<div className="container mx-auto">
				<div className="flex justify-center">
					<img src={logo} alt="Bibliophilia" width="400" />
				</div>
				<div className="pb-6">
					<Card className="p-3">
						<Input placeholder="Type something..." />
					</Card>
				</div>
				<div className="grid grid-cols-8 gap-4">
					{data.map((item, i) => (
						<BibThumbnailItem key={i} value={item} />
					))}
				</div>
			</div>
		</SidebarOnlyLayout>
	);
}
