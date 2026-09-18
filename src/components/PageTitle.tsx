import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import type { ReactNode } from "react";

export function PageTitle({
  icon,
  color = "primary",
  children,
}: {
  icon: ReactNode;
  color?: "primary" | "secondary";
  children: ReactNode;
}) {
  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 44,
          height: 44,
          borderRadius: "50%",
          bgcolor: `${color}.main`,
          color: `${color}.contrastText`,
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Typography variant="h4" component="h1">
        {children}
      </Typography>
    </Stack>
  );
}
