import { DevicesW700 } from "@material-symbols-svg/react/icons/devices";
import { WbSunnyFillW600 } from "@material-symbols-svg/react/icons/wb-sunny";
import { DarkModeFillW100 } from "@material-symbols-svg/react/icons/dark-mode";

import DsSelect from "@components/ds/Select";
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
      Icon = DevicesW700;
      break;
    case "light":
      Icon = WbSunnyFillW600;
      break;
    case "dark":
      Icon = DarkModeFillW100;
      break;
  }

  return (
    <DsSelect
      trigger={<SelectTrigger Icon={Icon} />}
      triggerProps={{
        size: "icon-sm",
      }}
      options={THEMES}
      optionRender={(theme) => <span className="capitalize">{theme}</span>}
      onSelect={setTheme} />
  );
}

function SelectTrigger({ Icon }: { Icon: any }) {
  return (
    <>
      <Icon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all" />
      <span className="sr-only">
        Toggle theme
      </span>
    </>
  );
}
