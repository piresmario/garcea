import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { PageContainer } from "@/components/PageContainer";
import { FormCard } from "@/components/FormCard";
import { submitContactAction } from "./actions";

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const { sent } = await searchParams;

  return (
    <PageContainer maxWidth="sm">
      <Typography variant="h4" component="h1">
        Contactos
      </Typography>
      <Typography color="text.secondary">
        Tem alguma questão ou sugestão? Envie-nos uma mensagem.
      </Typography>
      <FormCard>
        {sent ? (
          <Alert severity="success">Obrigado, a sua mensagem foi enviada.</Alert>
        ) : (
          <Stack component="form" action={submitContactAction} spacing={2}>
            <Box sx={{ display: "none" }} aria-hidden="true">
              <label>
                Company
                <input type="text" name="company" tabIndex={-1} autoComplete="off" />
              </label>
            </Box>
            <TextField label="Nome" name="name" required />
            <TextField label="Email" name="email" type="email" required />
            <TextField label="Mensagem" name="message" required multiline rows={5} />
            <Button type="submit" variant="contained" sx={{ alignSelf: "flex-start" }}>
              Enviar
            </Button>
          </Stack>
        )}
      </FormCard>
    </PageContainer>
  );
}
