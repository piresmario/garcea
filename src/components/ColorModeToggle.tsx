"use client";

import { useColorScheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export function ColorModeToggle() {
  const { mode, systemMode, setMode } = useColorScheme();

  if (!mode) {
    return (
      <IconButton aria-label="Alternar tema" color="inherit" disabled>
        <Brightness4Icon />
      </IconButton>
    );
  }

  const resolvedMode = mode === "system" ? systemMode : mode;
  const isDark = resolvedMode === "dark";

  return (
    <IconButton
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      color="inherit"
      onClick={() => setMode(isDark ? "light" : "dark")}
    >
      {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}
