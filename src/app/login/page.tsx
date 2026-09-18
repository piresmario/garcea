import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { PageContainer } from "@/components/PageContainer";
import { authenticate } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <PageContainer maxWidth="xs">
      <Typography variant="h4" component="h1">
        Entrar
      </Typography>
      {error && <Alert severity="error">Email ou palavra-passe inválidos.</Alert>}
      <Stack component="form" action={authenticate} spacing={2}>
        <TextField
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
        <TextField
          label="Palavra-passe"
          name="password"
          type="password"
          required
          autoComplete="current-password"
        />
        <Button type="submit" variant="contained">
          Entrar
        </Button>
      </Stack>
    </PageContainer>
  );
}
