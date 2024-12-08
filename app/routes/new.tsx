import type { MetaFunction, ActionFunctionArgs } from "@remix-run/cloudflare";
import { useFetcher, Link } from "@remix-run/react";
import { useState, useEffect } from "react";
import { ManualCatalogComposer } from "~/components/manual-catalog-composer";
import { DefaultLayout } from "~/layouts/default";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableHead,
	TableRow,
} from "~/components/ui/table";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuTrigger,
	ContextMenuItem,
} from "~/components/ui/context-menu";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { FilePlus, Trash, Edit } from "@mynaui/icons-react";
import { lookupByIsbn } from "~/model/ndl-search";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";

import { useToast } from "~/hooks/use-toast";
import type { BibRecordDraft } from "~/model/bib-record";

import {
	ResizablePanelGroup,
	ResizablePanel,
	ResizableHandle,
} from "~/components/ui/resizable";

export const meta: MetaFunction = () => {
	return [
		{ title: "Bibliophilia" },
		{
			name: "description",
			content: "Yet another information resource manager and more.",
		},
	];
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const req = await request.formData();
	const action_type = req.get("action_type");

	console.log("action called. action_type: ", action_type);
	switch (action_type) {
		case "lookup_by_isbn": {
			const isbn = req.get("isbn")!;
			return await lookupByIsbn(isbn.toString());
		}
		default:
			return new Response("Invalid action_type", { status: 400 });
	}
};

export default function Index() {
	const fetcher = useFetcher();

	const [candidates, setCandidates] = useState<BibRecordDraft[]>([]);

	const { toast } = useToast();

	const onIsbnKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key != "Enter") return; // Ignore if not Enter key
		fetcher.submit(e.currentTarget.form, { method: "post" });
	};

	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const onManualInputSubmit = (data: BibRecordDraft) => {
		setCandidates((candidates) => [...candidates, data]);
		toast({
			title: "下書きを追加しました",
			description: "書誌レコードの下書きを追加しました",
		});
	};

	useEffect(() => {
		if (!fetcher.data) return;
		setCandidates((candidates) => [
			...candidates,
			fetcher.data as BibRecordDraft,
		]);
	}, [fetcher.data]);

	const deleteRow = (index: number) => {
		setCandidates((candidates) => {
			const newCandidates = [...candidates];
			newCandidates.splice(index, 1);
			return newCandidates;
		});
	};

	const onRowSubmit = (index: number, work: BibRecordDraft) => {
		setCandidates((candidates) => {
			const newCandidates = [...candidates];
			newCandidates[index] = work;
			setIsDialogOpen(false);
			return newCandidates;
		});
	};

	return (
		<DefaultLayout>
			<div className="container mx-auto py-3 h-full">
				<ResizablePanelGroup direction="horizontal" className="h-full">
					<ResizablePanel className="p-3" defaultSize={30}>
						<Tabs defaultValue="isbn">
							<TabsList className="grid w-full grid-cols-2">
								<TabsTrigger value="isbn">ISBN</TabsTrigger>
								<TabsTrigger value="manually">直接入力</TabsTrigger>
							</TabsList>

							<TabsContent value="isbn">
								<CardHeader>
									<CardTitle>ISBNから登録 </CardTitle>
									<CardDescription>
										ISBNコードを入力して資料を登録します。目録情報の照会には、
										<Link to="https://ndlsearch.ndl.go.jp/"> NDLサーチ</Link>
										APIが利用されます。
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-2">
									<fetcher.Form method="post">
										<input
											type="hidden"
											name="action_type"
											value="lookup_by_isbn"
										/>
										<Input
											placeholder="ISBN-10またはISBN-13 例: 4003107012"
											name="isbn"
											onKeyDown={onIsbnKeyDown}
										></Input>
									</fetcher.Form>
								</CardContent>
							</TabsContent>

							<TabsContent value="manually">
								<CardHeader>
									<CardTitle>直接入力して登録</CardTitle>
									<CardDescription>
										書誌事項を直接入力して資料を登録します。
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-2">
									<ManualCatalogComposer onSubmit={onManualInputSubmit} />
								</CardContent>
							</TabsContent>
						</Tabs>
					</ResizablePanel>
					<ResizableHandle />

					<ResizablePanel className="p-3" defaultSize={70}>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>
										<Checkbox></Checkbox>
									</TableHead>
									<TableHead>ISBN</TableHead>
									<TableHead>タイトル</TableHead>
									<TableHead>著編者</TableHead>
									<TableHead>出版年月</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{candidates.map(function (item, i) {
									return (
										<Dialog
											key={i}
											open={isDialogOpen}
											onOpenChange={setIsDialogOpen}
										>
											<ContextMenu>
												<ContextMenuTrigger key={i} asChild>
													<TableRow>
														<TableCell max-width="1">
															<Checkbox />
														</TableCell>
														<TableCell>ここにISBNが入る</TableCell>
														<TableCell>{item.work.preferred_title}</TableCell>
														<TableCell>ここに著者が入る</TableCell>
														<TableCell>ここに日付が入る</TableCell>
													</TableRow>
												</ContextMenuTrigger>
												<ContextMenuContent>
													<DialogTrigger asChild>
														<ContextMenuItem>
															<span className="flex flex-row items-center gap-3">
																<Edit size={15} />
																編集
															</span>
														</ContextMenuItem>
													</DialogTrigger>
													<ContextMenuItem onClick={() => deleteRow(i)}>
														<span className="flex flex-row items-center gap-3 text-destructive">
															<Trash size={15} />
															削除
														</span>
													</ContextMenuItem>
												</ContextMenuContent>
											</ContextMenu>

											<DialogContent>
												<DialogHeader>
													<DialogTitle>目録情報の編集</DialogTitle>
												</DialogHeader>
												<div className="p-3">
													<ManualCatalogComposer
														value={item}
														onSubmit={(bibRecord) => onRowSubmit(i, bibRecord)}
													/>
												</div>
											</DialogContent>
										</Dialog>
									);
								})}
							</TableBody>
						</Table>

						<div className="flex flex-row justify-center">
							<Button>
								<FilePlus /> 選択中の資料を登録
							</Button>
						</div>
					</ResizablePanel>
				</ResizablePanelGroup>
			</div>
		</DefaultLayout>
	);
}
