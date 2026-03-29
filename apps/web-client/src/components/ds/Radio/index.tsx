import {
  useId,
  type HTMLAttributes,
} from "react";
import clsx from "clsx";
import { CheckCircleFillW400 } from "@material-symbols-svg/react/icons/check-circle";

import {
  themeCheckVariants,
  themeItemVariants,
  themeLabelVariants,
  type Theme,
} from "./definitions";

type OptionType = string | Record<string, string | number>;
type OptionValueType<T extends OptionType = string> = T extends string ? string : string | number | boolean;

interface Props<T extends OptionType = string> {
  value?: OptionValueType<T>;
  options: Array<T extends string ? string : Record<string, string | number>>;
  labelKey?: T extends string ? never : string;
  valueKey?: T extends string ? never : string;
  name?: string;
  containerProps?: HTMLAttributes<HTMLUListElement>;
  itemProps?: HTMLAttributes<HTMLElement>;
  disabled?: boolean;
  theme?: Theme;
  onChange?: (optionValue: OptionValueType<T>) => void;
}

export default function DsRadio<T extends OptionType = string>({
  value,
  options,
  labelKey,
  valueKey,
  name,
  containerProps,
  itemProps,
  disabled,
  theme = "primary",
  onChange,
}: Props<T>) {
  const id = useId();

  const getOptionLabel = (option: OptionType) => {
    if (typeof option === "string") return option;
    return option[labelKey ?? "label"];
  };

  const getOptionValue = (option: OptionType) => {
    if (typeof option === "string") return option;
    return option[valueKey ?? "label"];
  };

  return (
    <ul
      {...containerProps}
      className={clsx(
        "flex flex-col gap-3",
        containerProps?.className,
      )}>
      {options.map((option) => (
        <li key={getOptionValue(option)}>
          <label
            {...itemProps}
            className={clsx(
              "flex justify-between items-center gap-x-4 px-3 py-2 rounded-lg border transition-all duration-300",
              themeItemVariants[theme],
              itemProps?.className,
            )}>
            <span className={clsx(
              themeLabelVariants[theme],
              "brightness-75"
            )}>
              {getOptionLabel(option)}
            </span>

            <input
              type="radio"
              disabled={disabled}
              name={name || id}
              value={getOptionValue(option)}
              defaultChecked={getOptionValue(option) === value}
              className="peer hidden"
              onChange={({ target }) => onChange?.(target.value)} />
            <CheckCircleFillW400
              className={clsx(
                "size-5",
                getOptionValue(option) && "not-peer-checked:hidden",
                themeCheckVariants[theme],
              )} />
          </label>
        </li>
      ))}
    </ul>
  );
}
