import Paper from "@mui/material/Paper";
import type { ReactNode } from "react";

export function FormCard({ children }: { children: ReactNode }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: { xs: 3, sm: 4 },
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderTop: 3,
        borderTopColor: "primary.main",
      }}
    >
      {children}
    </Paper>
  );
}
