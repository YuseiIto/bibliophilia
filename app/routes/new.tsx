import type { MetaFunction } from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";
import { ManualRegisterForm } from "~/components/manual_register_form";

export const meta: MetaFunction = () => {
  return [
    { title: "Bibliophilia" },
    { name: "description", content: "Yet another information resource manager and more." },
  ];
};

export default function Index() {
  return (
    <p>Hello</p>
    /*
    <Flex m="5" direction="column">
      <Heading size="8"> Register </Heading>
      <Section>
        <Tabs.Root defaultValue="isbn">
          <Tabs.List>
            <Tabs.Trigger value="isbn">ISBN</Tabs.Trigger>
            <Tabs.Trigger value="manually">手入力</Tabs.Trigger>
          </Tabs.List>

          <Box pt="3">
            <Tabs.Content value="isbn">
              <Form method="post" action="/register_by_isbn">
                <Flex direction="row">
                  <Box pr="2" width="80%">
                    <TextField.Root placeholder="ISBN-10またはISBN-13 例: 4003107012" name="isbn" >
                    </TextField.Root>
                  </Box>
                  <Box width="20%">
                    <Button type="submit" variant="surface">検索</Button>
                  </Box>
                </Flex>
              </Form>
              <Section>
                <Table.Root>
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeaderCell width="1em"><Checkbox></Checkbox></Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell width="13em">ISBN</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>タイトル</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>著編者</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>出版年月</Table.ColumnHeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell max-width="1">
                        <Checkbox />
                      </Table.Cell>
                      <Table.Cell >978-4-87311-904-5</Table.Cell>
                      <Table.Cell>プログラミングTypeScript</Table.Cell>
                      <Table.Cell>オライリージャパン</Table.Cell>
                      <Table.Cell>2020</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table.Root>
              </Section>
              <Flex direction="row" justify="center">
                <Button size="3" variant="soft"> <FilePlusIcon /> 選択中の資料を登録</Button>
              </Flex>
            </Tabs.Content>

            <Tabs.Content value="manually">
              <ManualRegisterForm />
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Section>
    </Flex>
     */
  );
}

