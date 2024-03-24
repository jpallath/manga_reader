import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "./providers";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { UserServices } from "@/components/ui/userServices";

export const metadata: Metadata = {
  title: "Seibu",
  description: "Manga Culture from the Bottom Up",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          `h-[100dvh]  bg-gradient-to-b from-primary to-background font-sans relative antialiased flex items-center justify-center transition-all`,
          inter.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <UserServices />
          {children}
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
