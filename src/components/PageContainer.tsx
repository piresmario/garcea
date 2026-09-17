import Container from "@mui/material/Container";
import type { ReactNode } from "react";

export function PageContainer({
  children,
  maxWidth = "sm",
}: {
  children: ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg";
}) {
  return (
    <Container
      component="main"
      maxWidth={maxWidth}
      sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3, py: 8 }}
    >
      {children}
    </Container>
  );
}
