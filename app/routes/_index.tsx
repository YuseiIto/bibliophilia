import { useEffect, useRef, type ChangeEvent } from "react";
import type { MetaFunction, LoaderFunctionArgs } from "react-router";
import { useLoaderData, Form, useSubmit, useNavigation, Link } from "react-router";
import logo from "~/assets/logo.png";
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
	const inputRef = useRef<HTMLInputElement>(null);

	const searching =
		navigation.location &&
		new URLSearchParams(navigation.location.search).has("q");

	useEffect(() => {
		if (inputRef.current) inputRef.current.value = q;
	}, [q]);

	useEffect(() => () => clearTimeout(timer.current), []);

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
			<div className="mx-auto max-w-4xl px-4">
				<div className="flex justify-center mb-8">
					<img src={logo} alt="Bibliophilia" width="400" />
				</div>
				<div className="pb-6">
					<Form method="get" role="search">
						<Input
							ref={inputRef}
							type="search"
							name="q"
							defaultValue={q}
							onChange={onChange}
							placeholder="タイトル・著者・件名で検索"
							className={searching ? "opacity-50" : ""}
						/>
					</Form>
				</div>
				{q !== "" && (
					<div className="pb-3 text-sm text-muted-foreground">
						「{q}」の検索結果 ・ {data.length} 件 ・{" "}
						<Link to="/" className="text-blue-600 hover:underline">クリア</Link>
					</div>
				)}
				<BibRecordResults records={data} />
			</div>
		</SidebarOnlyLayout>
	);
}
