"use client";
import * as React from "react";
import { useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { SessionProvider } from "next-auth/react";
import { NavigationPane } from "@/components/ui/navigationPane";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  const triggerNav = () => {
    setIsOpen(!isOpen);
  };
  return (
    <SessionProvider>
      <NextThemesProvider {...props}>
        <button
          className="absolute top-4 left-4 bg-text rounded-lg"
          onClick={() => triggerNav()}
        >
          {isOpen ? (
            <svg
              className="sfill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 512 512"
            >
              <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
          ) : (
            <svg
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
          )}
        </button>
        <NavigationPane
          isOpen={isOpen}
          onClose={handleClose}
          triggerNav={triggerNav}
        />
        {children}
      </NextThemesProvider>
    </SessionProvider>
  );
}
