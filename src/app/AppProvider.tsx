// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useTheme } from "next-themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class" defaultTheme={theme}>
        <main className={`text-foreground bg-background ${theme}`}>
          <ToastContainer />
          {children}
        </main>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
