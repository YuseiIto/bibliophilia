import type { MetaFunction } from "@remix-run/cloudflare";
import { Button, Flex, Text } from "@radix-ui/themes";

export const meta: MetaFunction = () => {
  return [
    { title: "Bibliophilia" },
    { name: "description", content: "Yet another information resource manager and more." },
  ];
};

export default function Index() {
  return (
    <Flex direction="column" gap="2">
      <Text>Hello from Radix Themes :)</Text>
      <Button>Let's go</Button>
    </Flex>
  );
}

