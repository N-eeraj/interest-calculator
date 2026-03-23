import { Devices } from "@material-symbols-svg/react/rounded/w700";
import { WbSunnyFill } from "@material-symbols-svg/react/rounded/w600";
import { DarkModeFill } from "@material-symbols-svg/react/rounded/w100";

import DsButton from "@components/ds/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import {
  useTheme,
  type Theme,
} from "@components/theme/Provider";

const THEMES: Array<Theme> = [
  "system",
  "light",
  "dark",
] as const;

export default function ThemeToggle() {
  const {
    theme,
    setTheme,
  } = useTheme();

  let Icon;
  switch (theme) {
    case "system":
      Icon = Devices;
      break;
    case "light":
      Icon = WbSunnyFill;
      break;
    case "dark":
      Icon = DarkModeFill;
      break;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <DsButton
          variant="outline"
          size="icon"
          className="p-5">
          <Icon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all" />
          <span className="sr-only">
            Toggle theme
          </span>
        </DsButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {THEMES.map((theme) => (
          <DropdownMenuItem
            key={theme}
            className="capitalize"
            onClick={() => setTheme(theme)}>
            {theme}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
