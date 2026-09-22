"use client";

import { useRouter, usePathname } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export function FlashMessage({ message }: { message?: string }) {
  const router = useRouter();
  const pathname = usePathname();

  if (!message) return null;

  const clear = () => router.replace(pathname);

  return (
    <Snackbar
      open
      autoHideDuration={4000}
      onClose={clear}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity="success" variant="filled" onClose={clear} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
