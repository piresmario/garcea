import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { executeGraphQL } from "@/lib/graphql-server";
import { OFFICIAL_CONTACTS_QUERY } from "@/lib/queries/officialContacts";
import { PageContainer } from "@/components/PageContainer";
import { OfficialContactForm } from "@/components/OfficialContactForm";
import { createOfficialContactAction, deleteOfficialContactAction } from "./actions";

type OfficialContactsData = {
  officialContacts: { id: string; type: "EMAIL" | "PHONE"; value: string }[];
};

export default async function ManageOfficialContactsPage() {
  const data = await executeGraphQL<OfficialContactsData>(OFFICIAL_CONTACTS_QUERY);

  return (
    <PageContainer maxWidth="sm">
      <Typography variant="h4" component="h1">
        Gerir Contactos Oficiais
      </Typography>
      <Typography color="text.secondary">
        Estes emails e números de telefone são mostrados na página pública de
        Contactos.
      </Typography>

      <OfficialContactForm action={createOfficialContactAction} />

      {data.officialContacts.length === 0 ? (
        <Typography>Ainda não há contactos oficiais.</Typography>
      ) : (
        <Stack spacing={2}>
          {data.officialContacts.map((contact) => {
            const deleteContact = deleteOfficialContactAction.bind(null, contact.id);
            return (
              <Card
                key={contact.id}
                variant="outlined"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                  transition: "box-shadow 0.2s ease",
                  "&:hover": { boxShadow: 3 },
                }}
              >
                <Stack>
                  <Typography variant="caption" color="text.secondary">
                    {contact.type === "EMAIL" ? "Email" : "Número de Telefone"}
                  </Typography>
                  <Typography sx={{ fontWeight: 500 }}>{contact.value}</Typography>
                </Stack>
                <form action={deleteContact}>
                  <Button type="submit" color="error">
                    Eliminar
                  </Button>
                </form>
              </Card>
            );
          })}
        </Stack>
      )}
    </PageContainer>
  );
}
