import { type ReactElement, type ReactNode } from "react";
import { cn } from "~/utils/cn";
import { BackgroundBoxesCore } from "~/components/BackgroundBoxesCore";

interface IContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({
  children,
  className,
}: IContainerProps): ReactElement {
  return (
    <div
      className={cn(
        "h-full py-16 px-10",
        "flex flex-col justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface IBackgroundBoxesContainerProps {
  children?: ReactNode;
  className?: string;
}

export function BackgroundBoxesContainer({
  children,
  className,
}: IBackgroundBoxesContainerProps): ReactElement {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-slate-900 rounded-lg",
        className,
      )}
    >
      <Container className={cn("relative z-20 w-full")}>
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <BackgroundBoxesCore />
        {children}
      </Container>
    </div>
  );
}
