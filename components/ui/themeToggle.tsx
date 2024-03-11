"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  const [icon, setIcon] = useState("");

  useEffect(() => {
    setIcon(theme === "light" ? "☀️" : "🌙");
  }, [theme]);

  return (
    <label className="flex flex-col absolute bottom-16 right-16">
      <button
        className="p-2 rounded-lg absolute bg-background border border-text"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {icon}
      </button>
    </label>
  );
};
