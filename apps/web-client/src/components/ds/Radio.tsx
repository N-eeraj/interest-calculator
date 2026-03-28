import {
  useId,
  type HTMLAttributes,
} from "react";
import clsx from "clsx";

type OptionType = string | Record<string, string | number>;
type OptionValueType<T extends OptionType = string> = T extends string ? string : string | number | boolean;

interface Props<T extends OptionType = string> {
  value?: OptionValueType<T>;
  options: Array<T extends string ? string : Record<string, string | number>>;
  labelKey?: T extends string ? never : string;
  valueKey?: T extends string ? never : string;
  containerProps?: HTMLAttributes<HTMLUListElement>;
  itemProps?: HTMLAttributes<HTMLElement>;
  disabled?: boolean;
  onChange?: (optionValue: OptionValueType<T>) => void;
}

export default function DsRadio<T extends OptionType = string>({
  value,
  options,
  labelKey,
  valueKey,
  containerProps,
  itemProps,
  disabled,
  onChange,
}: Props<T>) {
  const name = useId();

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
              "flex items-center gap-x-2 px-3 py-2 hover:bg-primary/20 rounded-lg border border-primary transition-all duration-300",
              itemProps?.className,
            )}>
            <input
              type="radio"
              disabled={disabled}
              name={name}
              value={getOptionValue(option)}
              defaultChecked={getOptionValue(option) === value}
              className={clsx(
                "accent-primary"
              )}
              onChange={({ target }) => onChange?.(target.value)} />
            <span className={clsx(
              "text-primary"
            )}>
              {getOptionLabel(option)}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}
