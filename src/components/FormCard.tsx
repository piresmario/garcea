import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import type { ReactNode } from "react";

export function FormCard({
  children,
  error,
}: {
  children: ReactNode;
  error?: string;
}) {
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
      {error && <Alert severity="error">{error}</Alert>}
      {children}
    </Paper>
  );
}
