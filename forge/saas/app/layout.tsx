import "./global.css";

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { type ReactElement, type ReactNode } from "react";
import { Provider } from "~/app/Provider";

const font = Roboto({
  weight: "400",
  subsets: ["latin"],
});

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
      <body className={font.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
