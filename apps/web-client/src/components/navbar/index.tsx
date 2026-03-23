import type { HTMLAttributes } from "react";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";

import ThemeSelect from "@components/theme/Select";
import Profile from "@components/navbar/Profile";

export default function Navbar({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <nav
      {...props}
      className={clsx(
        "flex justify-between items-center h-16 px-4 py-2 bg-card shadow-lg shadow-primary/50 z-10",
        className,
      )}>
      <Link
        to="/"
        className="text-2xl font-black bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
        TS-IC
      </Link>

      <div className="flex items-center gap-x-4">
        <ThemeSelect />
        <Profile />
      </div>
    </nav>
  );
}
