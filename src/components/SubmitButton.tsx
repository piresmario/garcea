"use client";

import { useFormStatus } from "react-dom";
import Button, { type ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

export function SubmitButton({ disabled, startIcon, ...props }: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      {...props}
      type="submit"
      disabled={pending || disabled}
      startIcon={pending ? <CircularProgress size={16} color="inherit" /> : startIcon}
    />
  );
}
