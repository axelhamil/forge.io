"use client";
import { type ReactElement, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@nextui-org/Switch";
import { MoonIcon } from "~/app/_components/icons/MoonIcon";
import { SunIcon } from "~/app/_components/icons/SunIcon";
import { cn } from "~/utils/cn";

interface IThemeSwitcherProps {
  className?: string;
}

export default function ThemeSwitcher({
  className,
}: IThemeSwitcherProps): ReactElement {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Switch
      size="md"
      color="warning"
      defaultSelected={theme === "light"}
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <SunIcon className={className} />
        ) : (
          <MoonIcon className={className} />
        )
      }
      onValueChange={(value) => {
        setTheme(value ? "light" : "dark");
      }}
      className={cn(className)}
    />
  );
}
