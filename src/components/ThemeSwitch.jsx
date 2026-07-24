"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // useEffect only runs on the client, avoiding hydration mismatches
  useEffect(() => {
    const setMount = () => {
      return setMounted(true);
    };
    setMount();
  }, []);

  // Return a transparent placeholder of the exact same size before the client mounts.
  // This prevents layout shift and keeps the server/client HTML identical.
  if (!mounted) {
    return (
      <button
        className="p-2 rounded-md hover:bg-default-100"
        aria-label="Toggle theme"
      >
        <div style={{ width: 18, height: 18 }} />
      </button>
    );
  }

  // Use resolvedTheme to correctly handle the "system" default state
  const currentTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="p-2 rounded-md hover:bg-default-100"
      aria-label="Toggle theme"
    >
      {currentTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
