export const themes = [
  "primary",
  "secondary",
] as const;
export type Theme = typeof themes[number];

export const themeItemVariants: Record<Theme, string> = {
  primary: "hover:bg-primary/20 border-primary dark:shadow-md dark:shadow-primary/50",
  secondary: "hover:bg-secondary/20 border-secondary dark:shadow-md dark:shadow-secondary/50",
} as const;

export const themeLabelVariants: Record<Theme, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
} as const;

export const themeCheckVariants: Record<Theme, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
} as const;
