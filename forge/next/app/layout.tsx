import "./global.css";

import type { Metadata } from "next";
import { type ReactElement, type ReactNode } from "react";
import { Inter } from "next/font/google";
import { Providers } from "~/app/providers";

const inter = Inter({
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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <main>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
