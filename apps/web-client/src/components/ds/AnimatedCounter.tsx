import type { ComponentProps } from "react";
import { AnimatedCounter } from  "react-animated-counter";

export default function DsAnimatedCounter({
  incrementColor = "inherit",
  decrementColor = "inherit",
  color = "var(--foreground)",
  includeCommas = true,
  ...props
}: ComponentProps<typeof AnimatedCounter>) {
  return (
    <AnimatedCounter
      {...props}
      includeCommas={includeCommas}
      incrementColor={incrementColor}
      decrementColor={decrementColor}
      color={color} />
  );
}
