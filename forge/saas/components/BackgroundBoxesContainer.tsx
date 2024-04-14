import { type ReactElement, type ReactNode } from "react";
import { cn } from "~/utils/cn";
import { BoxesCore } from "~/components/BoxesCore";

interface IBackgroundBoxesContainerProps {
  children?: ReactNode;
  className?: string;
}

export function BackgroundBoxesContainer({
  children,
  className,
}: IBackgroundBoxesContainerProps): ReactElement {
  return (
    <div className={cn("relative overflow-hidden bg-slate-900", className)}>
      <div className={cn("h-full flex flex-col relative z-20 w-full p-8")}>
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <BoxesCore />
        {children}
      </div>
    </div>
  );
}
