export const sizes = [
  "default",
  "xs",
  "sm",
  "lg",
  "icon",
  "icon-xs",
  "icon-sm",
  "icon-lg",
] as const;

export const variants = [
  "default",
  "secondary",
  "destructive",
  "outline",
  "secondary-outline",
  "destructive-outline",
] as const;
export type Variant = typeof variants[number];

export const variantClassMap: Record<Variant, string> = {
  default: `
    px-7 bg-gradient-to-br from-primary to-primary/30 text-white font-medium border-none rounded-full shadow-[0_8px_20px_#a78bfa66] dark:bg-primary! dark:text-primary-foreground dark:rounded-lg! dark:shadow-[0_0_2px_rgba(0,245,160,0.2),0_0_6px_rgba(0,245,160,0.4),0_0_30px_rgba(0,245,160,0.5)] hover:bg-transparent hover:to-primary/50 dark:hover:bg-transparent dark:hover:shadow-[0_0_6px_rgba(0,245,160,0.5),0_0_15px_rgba(0,245,160,0.7),0_0_40px_rgba(0,245,160,1)] active:bg-[#a9c6cc] dark:active:shadow-[0_0_5px_rgba(0,245,160,0.6),0_0_20px_rgba(0,245,160,0.9)]
  `,
  secondary: `
    px-7 bg-gradient-to-br from-secondary to-secondary/30 text-white font-medium border-none rounded-full shadow-[0_8px_20px_#22d3ee66] dark:bg-secondary! dark:text-secondary-foreground dark:rounded-lg! dark:shadow-[0_0_3px_rgba(0,217,245,0.2),0_0_8px_rgba(0,217,245,0.4),0_0_30px_rgba(0,217,245,0.5)] hover:bg-transparent hover:to-secondary/50 dark:hover:bg-transparent dark:hover:shadow-[0_0_8px_rgba(0,217,245,0.5),0_0_20px_rgba(0,217,245,0.7),0_0_40px_rgba(0,217,245,1)] active:bg-[#00a8d6] dark:active:shadow-[0_0_5px_rgba(0,217,245,0.6),0_0_20px_rgba(0,217,245,0.9)]
  `,
  destructive: `
    px-7 bg-gradient-to-br from-destructive to-destructive/30 text-white font-medium border-none rounded-full shadow-[0_8px_20px_#ef444466] dark:bg-destructive! dark:shadow-[0_0_3px_rgba(255,77,109,0.2),0_0_8px_rgba(255,77,109,0.4),0_0_30px_rgba(255,77,109,0.5)] dark:text-white dark:rounded-lg! hover:bg-transparent hover:to-destructive/50 dark:hover:bg-transparent dark:hover:shadow-[0_0_8px_rgba(255,77,109,0.5),0_0_20px_rgba(255,77,109,0.7),0_0_40px_rgba(255,77,109,1)] active:bg-[#ff2956] dark:active:shadow-[0_0_5px_rgba(255,77,109,0.6),0_0_20px_rgba(255,77,109,0.9)]
  `,
  outline: `
    px-7 bg-transparent text-primary font-medium border-2 border-primary rounded-full shadow-[0_8px_20px_rgba(var(--primary),0.2)] dark:bg-transparent dark:text-primary dark:border-primary dark:rounded-lg! dark:shadow-[0_0_6px_rgba(0,245,160,0.4),0_0_20px_rgba(0,245,160,0.6)] hover:bg-primary/10 hover:shadow-[0_8px_20px_rgba(var(--primary),0.3)] dark:hover:bg-transparent dark:hover:shadow-[0_0_12px_rgba(0,245,160,0.6),0_0_30px_rgba(0,245,160,0.8)] active:bg-primary/20 dark:active:shadow-[0_6px_15px_rgba(var(--primary),0.2)] dark:active:bg-primary/10 dark:active:shadow-[0_0_10px_rgba(0,245,160,0.5),0_0_25px_rgba(0,245,160,0.9)]
  `,
  "secondary-outline": `
    px-7 bg-transparent text-secondary font-medium border-2 border-secondary rounded-full shadow-[0_8px_20px_rgba(var(--secondary),0.2)] dark:bg-transparent dark:text-secondary dark:border-secondary dark:rounded-lg! dark:shadow-[0_0_6px_rgba(0,217,245,0.4),0_0_20px_rgba(0,217,245,0.6)] hover:bg-secondary/10 hover:shadow-[0_8px_20px_rgba(var(--secondary),0.3)] dark:hover:bg-transparent dark:hover:shadow-[0_0_12px_rgba(0,217,245,0.6),0_0_30px_rgba(0,217,245,0.8)] active:bg-secondary/20 dark:active:shadow-[0_6px_15px_rgba(var(--secondary),0.2)] dark:active:bg-secondary/10 dark:active:shadow-[0_0_10px_rgba(0,217,245,0.5),0_0_25px_rgba(0,217,245,0.9)]
  `,
  "destructive-outline": `
    px-7 bg-transparent text-destructive font-medium border-2 border-destructive rounded-full shadow-[0_8px_20px_rgba(var(--destructive),0.2)] dark:bg-transparent dark:text-destructive dark:border-destructive dark:rounded-lg! dark:shadow-[0_0_6px_rgba(255,77,109,0.4),0_0_20px_rgba(255,77,109,0.6)] hover:bg-destructive/10 hover:shadow-[0_8px_20px_rgba(var(--destructive),0.3)] dark:hover:bg-transparent dark:hover:shadow-[0_0_12px_rgba(255,77,109,0.6),0_0_30px_rgba(255,77,109,0.8)] active:bg-destructive/20 dark:active:shadow-[0_6px_15px_rgba(var(--destructive),0.2)] dark:active:bg-destructive/10 dark:active:shadow-[0_0_10px_rgba(255,77,109,0.5),0_0_25px_rgba(255,77,109,0.9)]
  `,
} as const;
