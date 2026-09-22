"use client";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { PageContainer } from "@/components/PageContainer";

export default function ManageError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <PageContainer maxWidth="sm">
      <Typography variant="h4" component="h1">
        Algo correu mal
      </Typography>
      <Typography color="text.secondary">
        Ocorreu um erro inesperado. Pode tentar novamente ou voltar à área de
        gestão.
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={() => retry()}>
          Tentar novamente
        </Button>
        <Button href="/manage" variant="outlined">
          Voltar à Gestão
        </Button>
      </Stack>
    </PageContainer>
  );
}
