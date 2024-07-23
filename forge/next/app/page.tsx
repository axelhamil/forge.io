import { Button } from "@repo/ui/components/ui/button";
import React, { type ReactElement } from "react";

function Page(): ReactElement {
  return (
    <div className="flex flex-col gap-5 m-5">
      hello world
      <Button variant="secondary" type="button" size="lg" className="w-20">
        Button
      </Button>
    </div>
  );
}

export default Page;
