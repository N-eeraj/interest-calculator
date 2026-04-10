import type { HTMLAttributes } from "react";
import clsx from "clsx";
import {
  themeVariants,
  sizeVariants,
  type Size,
  type Theme,
} from "./definitions";

interface Props extends HTMLAttributes<HTMLSpanElement> {
  size?: Size;
  theme?: Theme;
}

export default function Chip({
  theme = "primary",
  size = "default",
  children,
}: Props) {
  return (
    <span className={clsx(
      "rounded-full border",
      themeVariants[theme],
      sizeVariants[size],
    )}>
      {children}
    </span>
  );
}
