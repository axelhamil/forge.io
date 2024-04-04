"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ReactElement, ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }): ReactElement {
  const router = useRouter();

  return <NextUIProvider navigate={router.push}>{children}</NextUIProvider>;
}
