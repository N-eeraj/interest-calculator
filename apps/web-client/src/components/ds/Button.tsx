import { Button } from "@components/ui/button";
import clsx from "clsx";
import type { ComponentProps } from "react";

type Variant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";

const variantClassMap: Record<Variant, ComponentProps<typeof Button>["className"]> = {
  default: "",
  destructive: "",
  outline: "",
  secondary: "",
  ghost: "",
  link: "",
};

export default function DsButton({ variant, className, ...props }: ComponentProps<typeof Button>) {
  return (
    <Button
      className={clsx(
        variant ? variantClassMap[variant] : variantClassMap.default,
        className,
      )}
      {...props} />
  );
}
