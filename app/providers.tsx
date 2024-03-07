"use client";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
  attribute: string;
  defaultTheme: string;
}

export const Providers: React.FC<ProvidersProps> = ({ children, ...props }) => {
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
};
