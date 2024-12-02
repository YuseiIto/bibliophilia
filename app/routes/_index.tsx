import type { MetaFunction } from "@remix-run/cloudflare";
import logo from "~/assets/logo.png";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "Bibliophilia" },
    { name: "description", content: "Yet another information resource manager and more." },
  ];
};


export default function Index() {

  return (
    <Button className="m-8"> Hello </Button>
    /*
    <Container size="4">
      <Flex direction="row" justify="center">
        <img src={logo} alt="Bibliophilia" width="400" />
      </Flex>
      <Box pb="6">
        <Card>
          <TextField.Root placeholder="Search the docs…" size="3" variant="surface">
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
            <TextField.Slot >
              <IconButton size="2" variant="ghost"><RocketIcon /> </IconButton>
            </TextField.Slot>
          </TextField.Root>
        </Card>
      </Box>
      <Grid columns="8" gap="3">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} height="200px" width="130px" />
        ))}
      </Grid>
    </Container>
    */
  );
}

