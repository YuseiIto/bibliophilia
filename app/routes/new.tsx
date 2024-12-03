import type { MetaFunction, ActionFunctionArgs } from "@remix-run/cloudflare";
import { useFetcher, Link } from "@remix-run/react";
import { useState, useEffect } from "react";
import { ManualRegisterForm } from "~/components/manual_register_form";
import { DefaultLayout } from "~/layouts/default";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { FilePlus } from "@mynaui/icons-react";

import { parseStringPromise } from "xml2js";

export const meta: MetaFunction = () => {
  return [
    { title: "Bibliophilia" },
    { name: "description", content: "Yet another information resource manager and more." },
  ];
};


interface CandidateItem { isbn: string, title: string, author: string, pubDate: string };

function isCandidateItem(item: any): item is CandidateItem {
  return "isbn" in item && "title" in item && "author" in item && "pubDate" in item;
}

const lookupByIsbn = async (isbn) => {
  const NDL_OPENSEARCH_API = "https://ndlsearch.ndl.go.jp/api/opensearch";
  const url = `${NDL_OPENSEARCH_API}?isbn=${isbn}`;
  const res = await fetch(url);
  const xml = await res.text().catch(console.error);
  const data = await parseStringPromise(xml!).catch(console.error);
  const item = data.rss.channel[0].item[0]; // FIXME: 無闇に0を取るべきではない気がする. 仕様要確認.

  const title = item.title[0];
  const author = item.author[0];
  const pubDate = item.pubDate[0];

  return { isbn, title, author, pubDate };
};

export async function action({ request }: ActionFunctionArgs) {
  const req = await request.formData();
  const action_type = req.get("action_type");

  console.log("action called. action_type: ", action_type);
  switch (action_type) {
    case "lookup_by_isbn":
      const isbn = req.get("isbn")!;
      return await lookupByIsbn(isbn);
    default:
      return new Response("Invalid action_type", { status: 400 });
  }
}


export default function Index() {

  const fetcher = useFetcher();


  const [candidates, setCandidates] = useState<CandidateItem[]>([]);

  const onIsbnKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key != "Enter") return; // Ignore if not Enter key
    fetcher.submit(e.currentTarget.form, { method: "post" });
  }


  useEffect(() => {
    if(!fetcher.data) return;
    setCandidates([fetcher.data as CandidateItem, ...candidates]);
  }, [fetcher.data])

  return (
    <DefaultLayout>
      <div className="container mx-auto p-3">
        <div className="flex flex-row gap-8">
          <div className="basis-1/3">
            <Tabs defaultValue="isbn">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="isbn">ISBN</TabsTrigger>
                <TabsTrigger value="manually">直接入力</TabsTrigger>
              </TabsList>

              <TabsContent value="isbn">
                <Card>
                  <CardHeader>
                    <CardTitle>ISBNから登録 </CardTitle>
                    <CardDescription> ISBNコードを入力して資料を登録します。目録情報の照会には、<Link to="https://ndlsearch.ndl.go.jp/"> NDLサーチ</Link>APIが利用されます。 </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <fetcher.Form method="post">
                      <input type="hidden" name="action_type" value="lookup_by_isbn" />
                      <Input placeholder="ISBN-10またはISBN-13 例: 4003107012" name="isbn" onKeyDown={onIsbnKeyDown}>
                      </Input>
                    </fetcher.Form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="manually">
                <Card>
                  <CardHeader>
                    <CardTitle>直接入力して登録</CardTitle>
                    <CardDescription> 書誌事項を直接入力して資料を登録します。</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <ManualRegisterForm />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead ><Checkbox></Checkbox></TableHead>
                  <TableHead >ISBN</TableHead>
                  <TableHead >タイトル</TableHead>
                  <TableHead >著編者</TableHead>
                  <TableHead>出版年月</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>

                {
                  candidates.map(function(item, i) {
                    return (
                      <TableRow key={i}>
                        <TableCell max-width="1">
                          <Checkbox />
                        </TableCell>
                        <TableCell >{item.isbn}</TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.author}</TableCell>
                        <TableCell>{item.pubDate}</TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>

            <div className="flex flex-row justify-center">
              <Button> <FilePlus /> 選択中の資料を登録</Button>
            </div >
          </div>

        </div>
      </div>
    </DefaultLayout>
  );
}

