import Link from "next/link";
import { ReactElement } from "react";

function SideBar(): ReactElement {
  return (
    <aside className={"flex justify-end navbar gap-3 bg-primary-100"}>
      <Link className={"btn btm-nav-sm"} href={"/"}>
        Home
      </Link>
      <Link className={"btn btm-nav-sm"} href={"/sign-up"}>
        Sign Up
      </Link>
      <Link className={"btn btm-nav-sm"} href={"/users"}>
        Users List
      </Link>
    </aside>
  );
}

export default SideBar;
