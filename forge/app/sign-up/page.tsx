import { Button, Input } from "@nextui-org/react";
import { ReactElement } from "react";

import createUserAction from "../../infra/actions/createUser.action";

function Page(): ReactElement {
  return (
    <section className={"w-full h-full flex justify-center items-center"}>
      <form action={createUserAction} className={"flex flex-col gap-3 w-80"}>
        <Input type="email" label="Email" placeholder="Enter your email" />
        <Input
          label="Password"
          variant="bordered"
          placeholder="Enter your password"
          type={"password"}
          className="max-w-xs"
        />
        <Button color="primary" type={"submit"}>
          Submit
        </Button>
      </form>
    </section>
  );
}

export default Page;
