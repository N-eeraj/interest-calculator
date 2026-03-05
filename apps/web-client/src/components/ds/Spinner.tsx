import clsx from "clsx";
import type { ComponentProps } from "react";

export default function DsSpinner({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={clsx(
        "relative rounded-full bg-conic from-secondary via-primary animate-spin dark:shadow-[0_-3px_18px_-3px_var(--secondary),-0_3px_18px_-3px_var(--primary)]",
        className,
      )}
      {...props}>
      <div className="absolute top-1/2 left-1/2 size-2/3 bg-background border rounded-full -translate-x-1/2 -translate-y-1/2" />
    </div>
  )
}
