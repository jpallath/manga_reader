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
    <div className="flex flex-row absolute bottom-16 right-4 gap-2">
      <label>
        <button
          onClick={() => {
            window.location.reload();
          }}
          className="p-2 rounded-lg  bg-background border border-text"
        >
          🔄
        </button>
      </label>
      <label>
        <button
          className="p-2 rounded-lg  bg-background border border-text"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {icon}
        </button>
      </label>
    </div>
  );
};
