export const themes = [
  "primary",
  "secondary",
  "destructive",
] as const;
export type Theme = typeof themes[number];

export const sizes = [
  "default",
  "sm",
  "lg",
] as const;
export type Size = typeof sizes[number];

export const themeVariants: Record<Theme, string> = {
  primary: "bg-primary/10 text-primary border-primary",
  secondary: "bg-secondary/10 text-secondary border-secondary",
  destructive: "bg-destructive/10 text-destructive border-destructive",
} as const;

export const sizeVariants: Record<Size, string> = {
  default: "text-xs px-4 py-0.75",
  sm: "text-[10px] px-2 py-0.5",
  lg: "text-sm px-6 py-1.75",
} as const;
