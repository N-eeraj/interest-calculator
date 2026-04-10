import {
  useId,
  type HTMLAttributes,
} from "react";
import clsx from "clsx";
import { CheckCircleFillW400 } from "@material-symbols-svg/react/icons/check-circle";
import { CircleW400 } from "@material-symbols-svg/react/icons/circle";

import {
  themeCheckVariants,
  themeDescriptionVariants,
  themeItemVariants,
  themeLabelVariants,
  type Theme,
} from "./definitions";

type OptionType = string | Record<string, string | number>;
type OptionValueType = string | number | boolean;

interface Props {
  value?: OptionValueType;
  options: Array<string | Record<string, string | number>>;
  labelKey?: string;
  valueKey?: string;
  name?: string;
  containerProps?: HTMLAttributes<HTMLUListElement>;
  itemProps?: HTMLAttributes<HTMLElement>;
  disabled?: boolean;
  descriptionRender?: (optionValue: OptionType) => string;
  theme?: Theme;
  onChange?: (optionValue: OptionValueType) => void;
}

export default function DsRadio({
  value,
  options,
  labelKey,
  valueKey,
  name,
  containerProps,
  itemProps,
  disabled,
  descriptionRender,
  theme = "primary",
  onChange,
}: Props) {
  const id = useId();

  const getOptionLabel = (option: OptionType) => {
    if (typeof option === "string") return option;
    return option[labelKey ?? "label"];
  };

  const getOptionValue = (option: OptionType) => {
    if (typeof option === "string") return option;
    return option[valueKey ?? "value"];
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
              "group flex justify-between items-center flex-wrap gap-x-4 gap-y-1 px-3 py-2 rounded-lg border transition-all duration-300",
              themeItemVariants[theme],
              itemProps?.className,
            )}>
            <span className={clsx(
              themeLabelVariants[theme],
              "font-medium group-not-has-checked:brightness-75"
            )}>
              {getOptionLabel(option)}
            </span>

            <input
              type="radio"
              disabled={disabled}
              name={name || id}
              value={getOptionValue(option)}
              defaultChecked={getOptionValue(option) === value}
              checked={onChange ? getOptionValue(option) === value : undefined}
              className="peer hidden"
              onChange={({ target }) => onChange?.(target.value)} />

            <CheckCircleFillW400
              className={clsx(
                "shrink-0 size-5",
                themeCheckVariants[theme],
                getOptionValue(option) && "not-peer-checked:hidden",
              )} />
            <CircleW400
              className={clsx(
                "shrink-0 size-5",
                themeCheckVariants[theme],
                getOptionValue(option) && "peer-checked:hidden",
              )} />

            {descriptionRender && (
              <p
                className={clsx(
                  "w-full text-xs",
                  themeDescriptionVariants[theme],
                )}>
                {descriptionRender(option)}
              </p>
            )}
          </label>
        </li>
      ))}
    </ul>
  );
}
