import {
  Fragment,
  useId,
  useState,
  type ComponentProps,
  type HTMLAttributes,
  type HTMLInputTypeAttribute,
} from "react";
import clsx from "clsx";

import { VisibilityFillW400 } from "@material-symbols-svg/react/icons/visibility";
import { VisibilityOffFillW400 } from "@material-symbols-svg/react/icons/visibility-off";

import { Input } from "@components/ui/input";
import DsButton from "@components/ds/Button";
import {
  themeVariants,
  themeLabelVariants,
  type Theme,
} from "./definitions";

interface Props extends Omit<ComponentProps<typeof Input>, "variant"> {
  label?: string;
  theme?: Theme;
  labelWrapperProps?: HTMLAttributes<HTMLDivElement>;
  inputWrapperProps?: HTMLAttributes<HTMLDivElement>;
}

export default function DsInput({
  theme = "primary",
  label,
  type,
  className,
  inputWrapperProps = {},
  labelWrapperProps = {},
  ...props
}: Props) {
  const id = useId();

  const [inputType, setInputType] = useState<HTMLInputTypeAttribute>(type ?? "text");
  const togglePasswordType = () => {
    setInputType((prev) => {
      if (prev === "password") return "text";
      return "password";
    });
  };

  const Wrapper = label ? "div" : Fragment;
  const wrapperProps = label ? {
    ...labelWrapperProps,
    className: clsx(
      className,
      labelWrapperProps.className,
      "flex flex-col gap-y-1",
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

      <div
        {...inputWrapperProps}
        className={clsx(
          inputWrapperProps.className,
          "relative",
        )}>
        <Input
          id={id}
          type={type === "password" ? inputType : type}
          className={clsx(
            "rounded-full dark:rounded ring focus-visible:ring-2 dark:shadow-md focus-visible:border-0 transition-all duration-300",
            themeVariants[theme],
            label ? "" : className,
          )}
          {...props}
        />

        {type === "password" && (
          <DsButton
            size="icon-xs"
            variant={theme === "primary" ? "default" : "secondary"}
            type="button"
            tabIndex={-1}
            className="absolute top-1/2 right-0 p-0 -translate-x-1/4 -translate-y-1/2"
            onClick={togglePasswordType}>
            {inputType === "password"
              ? <VisibilityFillW400 />
              : <VisibilityOffFillW400 />
            }
          </DsButton>
        )}
      </div>
    </Wrapper>
  );
}
