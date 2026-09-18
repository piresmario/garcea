import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import LoginIcon from "@mui/icons-material/Login";
import { PageContainer } from "@/components/PageContainer";
import { FormCard } from "@/components/FormCard";
import { authenticate } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <PageContainer maxWidth="xs">
      <Stack spacing={1} sx={{ alignItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            height: 56,
            borderRadius: "50%",
            bgcolor: "primary.main",
            color: "primary.contrastText",
          }}
        >
          <LoginIcon fontSize="medium" />
        </Box>
        <Typography variant="h4" component="h1">
          Entrar
        </Typography>
      </Stack>
      <FormCard>
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
      </FormCard>
    </PageContainer>
  );
}
