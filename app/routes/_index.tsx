import { useEffect, useRef, type ChangeEvent } from "react";
import type { MetaFunction, LoaderFunctionArgs } from "react-router";
import { useLoaderData, Form, useSubmit, useNavigation } from "react-router";
import logo from "~/assets/logo.png";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { SidebarOnlyLayout } from "~/layouts/sidebar-only";
import { BibRecordResults } from "~/components/bib-record-results";
import { Repository } from "~/db";

export const meta: MetaFunction = () => [
	{ title: "Bibliophilia" },
	{ name: "description", content: "Yet another information resource manager and more." },
];

export async function loader({ context, request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	const q = url.searchParams.get("q")?.trim() ?? "";
	const db = Repository.fromEnv(context.cloudflare.env);
	const data = q
		? await db.simpleSearchBibRecords(q)
		: await db.getAllBibRecordSummaries();
	return { data, q };
}

export default function Index() {
	const { data, q } = useLoaderData<typeof loader>();
	const submit = useSubmit();
	const navigation = useNavigation();
	const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	const searching =
		navigation.location &&
		new URLSearchParams(navigation.location.search).has("q");

	useEffect(() => {
		const el = document.getElementById("q");
		if (el instanceof HTMLInputElement) el.value = q;
	}, [q]);

	function onChange(event: ChangeEvent<HTMLInputElement>) {
		const form = event.currentTarget.form;
		if (!form) return;
		const isFirstSearch = q === "";
		clearTimeout(timer.current);
		timer.current = setTimeout(() => {
			submit(form, { replace: !isFirstSearch });
		}, 300);
	}

	return (
		<SidebarOnlyLayout>
			<div className="container mx-auto">
				<div className="flex justify-center">
					<img src={logo} alt="Bibliophilia" width="400" />
				</div>
				<div className="pb-6">
					<Card className="p-3">
						<Form method="get" role="search">
							<Input
								id="q"
								type="search"
								name="q"
								defaultValue={q}
								onChange={onChange}
								placeholder="タイトル・著者・件名で検索"
								className={searching ? "opacity-50" : ""}
							/>
						</Form>
					</Card>
				</div>
				{q !== "" && (
					<div className="pb-3 text-sm text-muted-foreground">
						「{q}」の検索結果 ・ {data.length} 件 ・{" "}
						<a href="/" className="text-blue-600 hover:underline">クリア</a>
					</div>
				)}
				<BibRecordResults records={data} />
			</div>
		</SidebarOnlyLayout>
	);
}
