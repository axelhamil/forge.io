import { ReactElement } from "react";

import createUserAction from "../../infra/actions/createUser.action";

function Page(): ReactElement {
  return (
    <section className={"w-full h-full flex justify-center items-center"}>
      <form action={createUserAction} className={"flex flex-col gap-3"}>
        <input
          placeholder="Email"
          type="email"
          name="email"
          className={"input input-bordered w-full max-w-xs"}
        />
        <input
          placeholder="Password"
          type="password"
          name="password"
          className={"input input-bordered w-full max-w-xs"}
        />
        <input type="submit" value="Submit" className="btn" />
      </form>
    </section>
  );
}

export default Page;
