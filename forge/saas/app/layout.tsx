import "./globals.css";
import "../domain/handlers/index";
import "../infra/config/db/hooks";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { type ReactElement, type ReactNode } from "react";
import { NUIProvider } from "../_providers/NUIProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  description: "Forge is a fullstack monorepo template for Next.js",
  title: "forge.io",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <NUIProvider>
          <main>{children}</main>
        </NUIProvider>
      </body>
    </html>
  );
}
