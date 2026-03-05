import { Input } from "@components/ui/input";
import clsx from "clsx";
import { type ComponentProps } from "react";
import { themeVariants, type Theme } from "./definitions";

interface Props extends Omit<ComponentProps<typeof Input>, "variant"> {
  theme?: Theme;
}

export default function DsInput({
  theme = "primary",
  className,
  ...props
}: Props) {
  return (
    <Input
      className={clsx(
        "rounded-full dark:rounded ring focus-visible:ring-2 dark:shadow-md focus-visible:border-0",
        themeVariants[theme],
        className,
      )}
      {...props} />
  );
}
