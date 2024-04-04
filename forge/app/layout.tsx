import "./globals.css";
import "../domain/handlers/index";
import "../infra/hooks/index";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactElement, ReactNode } from "react";

import SideBar from "../components/SideBar";
import { Providers } from "./provider";

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
        <Providers>
          <SideBar />
          <main className={"pt-10"}>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
