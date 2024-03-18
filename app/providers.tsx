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
