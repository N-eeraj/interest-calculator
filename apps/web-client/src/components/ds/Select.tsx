import type {
  ReactNode,
  ComponentProps,
} from "react";

import DsButton from "@components/ds/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import clsx from "clsx";

interface Props<T> {
  trigger: ReactNode;
  triggerProps?: ComponentProps<typeof DsButton>;
  options?: Array<T>;
  content?: ReactNode;
  onSelect?: (option: T) => void;
  optionRender?: (option: T) => ReactNode;
}

export default function DsSelect<T>({
  trigger,
  triggerProps = {},
  options = [],
  content,
  onSelect,
  optionRender = (option: any) => option,
}: Props<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <DsButton
          {...triggerProps}
          variant={triggerProps.variant ?? "outline"}
          className={clsx(
            "p-2",
            triggerProps.className,
          )}>
          {trigger}
        </DsButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {content ? content : (
          options.map((option, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => onSelect?.(option)}>
              {optionRender(option)}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
