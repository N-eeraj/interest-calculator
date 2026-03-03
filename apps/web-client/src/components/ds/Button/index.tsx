import { Button } from "@components/ui/button";
import clsx from "clsx";
import { Fragment, type ComponentProps } from "react";
import { Spinner } from "@components/ui/spinner";
import { variantClassMap, type Variant } from "./definitions";


interface Props extends Omit<ComponentProps<typeof Button>, "variant"> {
  loading?: boolean;
  variant?: Variant
}

export default function DsButton({
  variant = "default",
  disabled,
  loading=false,
  children,
  className,
  ...props
}: Props) {
  const ChildWrapper = loading ? "div" : Fragment;

  return (
    <Button
      disabled={disabled || loading}
      className={clsx(
        "relative transition-all duration-300",
        variant ? variantClassMap[variant] : variantClassMap.default,
        className,
      )}
      {...props}
    >
      {loading && <Spinner className="absolute top-1/2 left-1/2 -translate-1/2" />}
      <ChildWrapper className={clsx(loading && "invisible")}>
        {children}
      </ChildWrapper>
    </Button>
  );
}
