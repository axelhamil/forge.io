"use client";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { type ReactElement, type ReactNode } from "react";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: ReactNode }): ReactElement {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        storageKey="theme"
        themes={["light", "dark"]}
      >
        {children}
      </ThemeProvider>
    </NextUIProvider>
  );
}
