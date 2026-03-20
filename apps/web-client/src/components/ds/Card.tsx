import clsx from "clsx";
import type { HTMLAttributes, PropsWithChildren } from "react";

type Props = PropsWithChildren & HTMLAttributes<HTMLDivElement>;

export default function DsCard({ children, className, ...props }: Props) {
  return (
    <div
      className={clsx(
        "px-6 py-8 bg-card shadow-lg shadow-primary/50 dark:shadow-[0_2px_2px_rgba(0,245,160,0.2),0_0_6px_rgba(0,245,160,0.4),0_0_30px_rgba(0,245,160,0.5)] rounded-2xl dark:rounded-md",
        className,
      )}
      {...props}>
      {children}
    </div>
  );
}
