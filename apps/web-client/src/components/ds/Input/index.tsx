import { Input } from "@components/ui/input";
import clsx from "clsx";
import {
  Fragment,
  useId,
  type ComponentProps,
} from "react";
import {
  themeVariants,
  themeLabelVariants,
  type Theme,
} from "./definitions";

interface Props extends Omit<ComponentProps<typeof Input>, "variant"> {
  label?: string;
  theme?: Theme;
}

export default function DsInput({
  theme = "primary",
  label,
  className,
  ...props
}: Props) {
  const id = useId();
  const Wrapper = label ? "div" : Fragment;
  const wrapperProps = label ? {
    className: clsx(
      className,
      'flex flex-col gap-y-1'
    )
  } : {};

  return (
    <Wrapper {...wrapperProps}>
      {label && (
        <label
          htmlFor={id}
          className={clsx(
            "text-sm",
            themeLabelVariants[theme],
          )}>
          {label}
        </label>
      )}

      <Input
        id={id}
        className={clsx(
          "rounded-full dark:rounded ring focus-visible:ring-2 dark:shadow-md focus-visible:border-0 transition-all duration-300",
          themeVariants[theme],
          label ? '' : className,
        )}
        {...props}
      />
    </Wrapper>
  );
}
