import { type ReactElement, type ReactNode } from "react";
import { cn } from "~/utils/cn";

interface IHeaderProps {
  children: ReactNode;
  className?: string;
}

export function H1({ children, className }: IHeaderProps): ReactElement {
  return (
    <h1 className={cn("text-4xl font-bold text-foreground", className)}>
      {children}
    </h1>
  );
}

export function H2({ children, className }: IHeaderProps): ReactElement {
  return (
    <h2 className={cn("text-3xl font-semibold text-foreground", className)}>
      {children}
    </h2>
  );
}

export function H3({ children, className }: IHeaderProps): ReactElement {
  return (
    <h3 className={cn("text-2xl font-medium text-foreground", className)}>
      {children}
    </h3>
  );
}

export function H4({ children, className }: IHeaderProps): ReactElement {
  return (
    <h4 className={cn("text-xl font-light text-foreground", className)}>
      {children}
    </h4>
  );
}

export function H5({ children, className }: IHeaderProps): ReactElement {
  return (
    <h5 className={cn("text-lg font-light text-foreground", className)}>
      {children}
    </h5>
  );
}

export function H6({ children, className }: IHeaderProps): ReactElement {
  return (
    <h6 className={cn("text-xs font-extralight text-foreground", className)}>
      {children}
    </h6>
  );
}
