export const themes = [
  "primary",
  "secondary",
] as const;
export type Theme = typeof themes[number];

export const themeVariants: Record<Theme, string> = {
  primary: "focus:bg-primary/10 text-primary placeholder:text-primary/60 ring-primary/75 dark:shadow-primary",
  secondary: "focus:bg-secondary/10 text-secondary placeholder:text-secondary/60 ring-secondary/75 focus-visible:ring-secondary/75 selection:bg-secondary dark:shadow-secondary",
} as const;
