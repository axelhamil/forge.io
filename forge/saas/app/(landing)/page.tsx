import { type ReactElement } from "react";
import { Link } from "@nextui-org/react";

export default function Page(): ReactElement {
  return (
    <div>
      <h1 className="text-white text-xl">Landing</h1>
      <Link href="/login">Login</Link>
    </div>
  );
}
