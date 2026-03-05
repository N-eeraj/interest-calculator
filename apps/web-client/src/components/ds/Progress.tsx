import { Progress } from "@components/ui/progress";
import clsx from "clsx";
import type { ComponentProps } from "react";

export default function DsProgress({
  className,
  ...props
}: ComponentProps<typeof Progress>) {
  return (
    <Progress
      className={clsx(
        "dark:shadow-md dark:shadow-primary dark:rounded-md",
        "**:data-[slot=progress-indicator]:bg-linear-270 **:data-[slot=progress-indicator]:from-primary **:data-[slot=progress-indicator]:to-secondary",
        className,
      )}
      {...props} />
  )
}
