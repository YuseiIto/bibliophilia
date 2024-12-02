import type { MetaFunction } from "@remix-run/cloudflare";
import logo from "~/assets/logo.png";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Skeleton } from "~/components/ui/skeleton";

export const meta: MetaFunction = () => {
  return [
    { title: "Bibliophilia" },
    { name: "description", content: "Yet another information resource manager and more." },
  ];
};


export default function Index() {

  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <img src={logo} alt="Bibliophilia" width="400" />
      </div>
      <div className="pb-6">
        <Card className="p-3">
          <Input placeholder="Type something..." />
        </Card>
      </div>
      <div className="grid grid-cols-8 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="w-[130px] h-[200px]" />
        ))}
      </div>
    </div>
  );
}

