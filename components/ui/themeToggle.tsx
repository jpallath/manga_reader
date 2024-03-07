"use client";
import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  const ThemeIcon = ({ theme }: { theme: string | undefined }) => {
    if (theme === "light") return <SunIcon />;
    else {
      return <MoonIcon />;
    }
  };

  const updateTheme = () => {
    if (theme === "light") setTheme("dark");
    else {
      setTheme("light");
    }
  };

  return (
    <div className="absolute bottom-20 right-4">
      <Button
        onClick={updateTheme}
        className="bg-white text-black dark:bg-black dark:text-white"
      >
        <ThemeIcon theme={theme} />
      </Button>
    </div>
  );
}
