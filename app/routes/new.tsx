import type { MetaFunction } from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";
import { ManualRegisterForm } from "~/components/manual_register_form";
import { DefaultLayout } from "~/layouts/default";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Input } from "~/components/ui/input";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { FilePlus } from "@mynaui/icons-react";


export const meta: MetaFunction = () => {
  return [
    { title: "Bibliophilia" },
    { name: "description", content: "Yet another information resource manager and more." },
  ];
};

export default function Index() {
  return (
    <DefaultLayout>
      <div className="flex m-5 flex-col">
        <h1> Register </h1>
        <section className="m-3">
          <Tabs defaultValue="isbn">
            <TabsList>
              <TabsTrigger value="isbn">ISBN</TabsTrigger>
              <TabsTrigger value="manually">手入力</TabsTrigger>
            </TabsList>

            <TabsContent value="isbn">
              <Form method="post" action="/register_by_isbn">
                <div className="flex flex-row">
                  <div className="pr-2 width-[80%]">
                    <Input placeholder="ISBN-10またはISBN-13 例: 4003107012" name="isbn" >
                    </Input>
                  </div>
                  <div className="width=[20%]">
                  </div>
                </div>
              </Form>

              <section>
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
                    <TableRow>
                      <TableCell max-width="1">
                        <Checkbox />
                      </TableCell>
                      <TableCell >978-4-87311-904-5</TableCell>
                      <TableCell>プログラミングTypeScript</TableCell>
                      <TableCell>オライリージャパン</TableCell>
                      <TableCell>2020</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </section>

              <div className="flex flex-row justify-center">
                <Button> <FilePlus /> 選択中の資料を登録</Button>
              </div >

            </TabsContent>

            <TabsContent value="manually">
              <ManualRegisterForm />
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </DefaultLayout>
  );
}

