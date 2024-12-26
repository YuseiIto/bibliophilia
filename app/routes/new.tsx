import type { MetaFunction, ActionFunctionArgs } from "@remix-run/cloudflare";
import { useFetcher, Link } from "@remix-run/react";
import type { KeyboardEvent } from "react";
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

import type { CheckedState } from "@radix-ui/react-checkbox";
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

export const action = async ({ request, context }: ActionFunctionArgs) => {
	const req = await request.formData();
	const action_type = req.get("action_type");

	switch (action_type) {
		case "lookup_by_isbn": {
			const isbn = req.get("isbn")!;
			const data = await lookupByIsbn(isbn.toString());
			return { draft: data, kind: "draft" };
		}
		case "save": {
			const data = JSON.parse(req.get("data")?.toString() ?? "[]"); // TODO: Validate!!
			for (const item of data) {
				const db = new Repository(context.cloudflare.env);
				await db.insertBibRecord(item);
			}
			console.log("Insert success!");
			return new Response("saved", { status: 200 });
		}
		default:
			return new Response("Invalid action_type", { status: 400 });
	}
};

type BibRecordCandidate = BibRecordDraft & { checked: boolean };

export default function Index() {
	const fetcher = useFetcher();

	const [candidates, setCandidates] = useState<BibRecordCandidate[]>([]);
	const [headChecked, setHeadChecked] = useState<CheckedState>(false);

	const { toast } = useToast();

	const onIsbnKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key != "Enter") return; // Ignore if not Enter key
		fetcher.submit(e.currentTarget.form, { method: "post" });
	};

	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const computeHeadChecked = (candidates: BibRecordCandidate[]) => {
		const checkedCount = candidates.filter((x) => x.checked).length;
		if (checkedCount === 0) return false;
		if (checkedCount === candidates.length) return true;
		return "indeterminate";
	};

	const onManualInputSubmit = (data: BibRecordDraft) => {
		setCandidates((candidates) => {
			const newCandidates = [...candidates, { ...data, checked: false }];
			setHeadChecked(computeHeadChecked(newCandidates));
			return newCandidates;
		});
		toast({
			title: "下書きを追加しました",
			description: "書誌レコードの下書きを追加しました",
		});
	};

	useEffect(() => {
		if (!fetcher.data) return;
		const data: { draft: BibRecordDraft; kind: string } = fetcher.data as any;
		if (data.kind !== "draft") return;

		setCandidates((candidates) => {
			const newCandidates = [
				...candidates,
				{ ...(data.draft as BibRecordDraft), checked: false },
			];
			setHeadChecked(computeHeadChecked(newCandidates));
			return newCandidates;
		});
	}, [fetcher.data]);

	const deleteRow = (index: number) => {
		setCandidates((candidates) => {
			const newCandidates = [...candidates];
			newCandidates.splice(index, 1);
			setHeadChecked(computeHeadChecked(newCandidates));
			return newCandidates;
		});
	};

	const onRowSubmit = (index: number, work: BibRecordDraft) => {
		setCandidates((candidates) => {
			const newCandidates = [...candidates];
			newCandidates[index] = { ...work, checked: false };
			setIsDialogOpen(false);
			setHeadChecked(computeHeadChecked(newCandidates));
			return newCandidates;
		});
	};

	const handleChechedChange = (checked: CheckedState, index: number) => {
		setCandidates((candidates) => {
			if (checked === "indeterminate") return candidates;
			const newCandidates = [...candidates];
			newCandidates[index] = { ...newCandidates[index], checked };
			setHeadChecked(computeHeadChecked(newCandidates));
			return newCandidates;
		});
	};

	const handleHeadCheckedChange = (checked: CheckedState) => {
		setHeadChecked(checked);
		if (checked === "indeterminate") return;
		setCandidates((candidates) => {
			return candidates.map((candidate) => {
				return { ...candidate, checked };
			});
		});
	};

	const saveSelected = async () => {
		console.log("saving...");
		const formData = new FormData();
		formData.append("action_type", "save");
		const selectedCandidates = candidates.filter((x) => x.checked);
		formData.append("data", JSON.stringify(selectedCandidates));
		fetcher.submit(formData, { method: "post" });
	};

	return (
		<DefaultLayout>
			<div className="container mx-auto py-3 h-full">
				<ResizablePanelGroup direction="horizontal" className="h-full">
					<ResizablePanel className="p-3" defaultSize={30}>
						<Tabs defaultValue="isbn" className="h-full">
							<TabsList className="grid w-full grid-cols-2">
								<TabsTrigger value="isbn">ISBN</TabsTrigger>
								<TabsTrigger value="manually">直接入力</TabsTrigger>
							</TabsList>

							<TabsContent value="isbn" className="m-0">
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

							<TabsContent
								value="manually"
								className="flex flex-col m-0 h-[calc(100%-2.5rem)]"
							>
								{/* 2.5rem is the height of the tabs (h-10) */}
								<header className="flex flex-col space-y-1.5 p-6 max-h-1/5">
									<h3 className="font-bold text-2xl">直接入力して登録</h3>
									<p className="text-sm text-muted-foreground">
										書誌事項を直接入力して資料を登録します。
									</p>
								</header>
								<div className="grow h-4/5">
									<ManualCatalogComposer onSubmit={onManualInputSubmit} />
								</div>
							</TabsContent>
						</Tabs>
					</ResizablePanel>
					<ResizableHandle />

					<ResizablePanel className="p-3" defaultSize={70}>
						<div className="overflow-y-auto h-full">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>
											<Checkbox
												checked={headChecked}
												onCheckedChange={handleHeadCheckedChange}
											/>
										</TableHead>
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
																<Checkbox
																	checked={item.checked}
																	onCheckedChange={(checked) =>
																		handleChechedChange(checked, i)
																	}
																/>
															</TableCell>
															<TableCell>{item.work.preferred_title}</TableCell>
															<TableCell>
																{item.agents.map((x) => x.preferredName).join()}
															</TableCell>
															<TableCell>
																{item.dates.map((x) => x.value).join()}
															</TableCell>
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

												<DialogContent className="h-[80vh]">
													<DialogHeader className="max-h-[2rem]">
														<DialogTitle>目録情報の編集</DialogTitle>
													</DialogHeader>
													<div className="p-3 h-[calc(75vh-2rem)]">
														<ManualCatalogComposer
															value={item}
															onSubmit={(bibRecord) =>
																onRowSubmit(i, bibRecord)
															}
														/>
													</div>
												</DialogContent>
											</Dialog>
										);
									})}
								</TableBody>
							</Table>

							<div className="flex flex-row justify-center">
								<Button type="button" onClick={saveSelected}>
									<FilePlus /> 選択中の資料を登録
								</Button>
							</div>
						</div>
					</ResizablePanel>
				</ResizablePanelGroup>
			</div>
		</DefaultLayout>
	);
}
