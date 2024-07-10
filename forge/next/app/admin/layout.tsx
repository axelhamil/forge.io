import React, { type ReactElement, type ReactNode } from "react";

interface ILayoutProps {
  children: ReactNode;
}

function Layout({ children }: ILayoutProps): ReactElement {
  return <main className="flex overflow-hidden">{children}</main>;
}

export default Layout;
