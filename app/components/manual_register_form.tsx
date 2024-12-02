import { Form } from "@remix-run/react";

export function ManualRegisterForm() {
  return (
    <Form method="post" action="/register_manually">
      <p> 手動登録 </p>
    </Form>
  );
}
