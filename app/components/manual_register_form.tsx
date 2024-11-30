import { Form } from "@remix-run/react";
import { Text } from "@radix-ui/themes";

export function ManualRegisterForm() {
  return (
    <Form method="post" action="/register_manually">
      <Text> 手動登録 </Text>
    </Form>
  );
}
