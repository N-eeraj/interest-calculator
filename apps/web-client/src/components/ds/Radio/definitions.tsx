export const themes = [
  "primary",
  "secondary",
] as const;
export type Theme = typeof themes[number];

export const themeItemVariants: Record<Theme, string> = {
  primary: "hover:bg-primary/20 has-checked:bg-primary border-primary dark:shadow-md dark:shadow-primary/50",
  secondary: "hover:bg-secondary/20 has-checked:bg-secondary border-secondary dark:shadow-md dark:shadow-secondary/50",
} as const;

export const themeLabelVariants: Record<Theme, string> = {
  primary: "text-primary group-has-checked:text-primary-foreground",
  secondary: "text-secondary group-has-checked:text-secondary-foreground",
} as const;

export const themeCheckVariants: Record<Theme, string> = {
  primary: "text-primary peer-checked:text-primary-foreground",
  secondary: "text-secondary peer-checked:text-secondary-foreground",
} as const;

export const themeDescriptionVariants: Record<Theme, string> = {
  primary: "text-primary/80 group-has-checked:text-primary-foreground",
  secondary: "text-secondary/80 group-has-checked:text-secondary-foreground",
} as const;
