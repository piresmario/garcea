"use client";

import { useFormStatus } from "react-dom";
import IconButton, { type IconButtonProps } from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";

export function SubmitIconButton({ disabled, children, ...props }: IconButtonProps) {
  const { pending } = useFormStatus();

  return (
    <IconButton {...props} type="submit" disabled={pending || disabled}>
      {pending ? <CircularProgress size={16} color="inherit" /> : children}
    </IconButton>
  );
}
