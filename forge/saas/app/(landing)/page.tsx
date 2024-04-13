import { type ReactElement } from "react";
import { Link } from "@nextui-org/react";
import { H1 } from "~/components/Heading";

export default function Page(): ReactElement {
  return (
    <div>
      <H1>Landing</H1>
      <Link href="/login">Login</Link>
    </div>
  );
}
