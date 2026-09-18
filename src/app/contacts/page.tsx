import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { PageContainer } from "@/components/PageContainer";
import { FormCard } from "@/components/FormCard";
import { executeGraphQL } from "@/lib/graphql-server";
import { OFFICIAL_CONTACTS_QUERY } from "@/lib/queries/officialContacts";
import { submitContactAction } from "./actions";

type OfficialContactsData = {
  officialContacts: { id: string; type: "EMAIL" | "PHONE"; value: string }[];
};

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const { sent } = await searchParams;
  const contactsData =
    await executeGraphQL<OfficialContactsData>(OFFICIAL_CONTACTS_QUERY);
  const emails = contactsData.officialContacts.filter((c) => c.type === "EMAIL");
  const phones = contactsData.officialContacts.filter((c) => c.type === "PHONE");

  return (
    <PageContainer maxWidth="sm">
      <Typography variant="h4" component="h1">
        Contactos
      </Typography>
      <Typography color="text.secondary">
        Gostaria de ver o Rancho Folclórico das Lavradeiras de Gondar no seu evento? Pode contactar-nos
      </Typography>

      {(emails.length > 0 || phones.length > 0) && (
        <Paper variant="outlined" sx={{ p: { xs: 3, sm: 4 } }}>
          <Stack spacing={1.5}>
            {emails.map((email) => (
              <Stack
                key={email.id}
                direction="row"
                spacing={1.5}
                sx={{ alignItems: "center" }}
              >
                <EmailIcon color="primary" fontSize="small" />
                <Typography component="a" href={`mailto:${email.value}`} sx={{ color: "inherit" }}>
                  {email.value}
                </Typography>
              </Stack>
            ))}
            {phones.map((phone) => (
              <Stack
                key={phone.id}
                direction="row"
                spacing={1.5}
                sx={{ alignItems: "center" }}
              >
                <PhoneIcon color="primary" fontSize="small" />
                <Typography component="a" href={`tel:${phone.value}`} sx={{ color: "inherit" }}>
                  {phone.value}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Paper>
      )}

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
