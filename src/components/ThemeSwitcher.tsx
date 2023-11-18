// app/components/ThemeSwitcher.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { MoonIcon, Sun, SunMoon } from "lucide-react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="light">Theme</Button>
        </DropdownTrigger>
        <DropdownMenu variant="solid" aria-label="Dropdown menu with icons">
          <DropdownItem
            key="light"
            startContent={<Sun />}
            onClick={() => setTheme("light")}
            className={`${
              theme == "light" ? "text-white bg-blue-500" : "text-foreground"
            }`}
          >
            Light
          </DropdownItem>
          <DropdownItem
            key="dark"
            startContent={<MoonIcon />}
            onClick={() => setTheme("dark")}
            className={`${
              theme == "dark" ? "text-white bg-blue-500" : "text-foreground"
            }`}
          >
            Dark
          </DropdownItem>
          <DropdownItem
            key="system"
            startContent={<SunMoon />}
            onClick={() => setTheme("system")}
            className={`${
              theme == "system" ? "text-white bg-blue-500" : "text-foreground"
            }`}
          >
            System
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
