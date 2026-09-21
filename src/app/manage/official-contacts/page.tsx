import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import { executeGraphQL } from "@/lib/graphql-server";
import { OFFICIAL_CONTACTS_QUERY } from "@/lib/queries/officialContacts";
import { PageContainer } from "@/components/PageContainer";
import { PageTitle } from "@/components/PageTitle";
import { OfficialContactForm } from "@/components/OfficialContactForm";
import { SubmitButton } from "@/components/SubmitButton";
import {
  OfficialContactIcon,
  OFFICIAL_CONTACT_TYPE_LABELS,
} from "@/components/OfficialContactIcon";
import { createOfficialContactAction, deleteOfficialContactAction } from "./actions";

type OfficialContactsData = {
  officialContacts: {
    id: string;
    type: "EMAIL" | "PHONE" | "FACEBOOK";
    label: string | null;
    value: string;
  }[];
};

export default async function ManageOfficialContactsPage() {
  const data = await executeGraphQL<OfficialContactsData>(OFFICIAL_CONTACTS_QUERY);

  return (
    <PageContainer maxWidth="sm">
      <PageTitle icon={<ContactPhoneIcon />}>Gerir Contactos Oficiais</PageTitle>
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
                  flexWrap: "wrap",
                  gap: 2,
                  p: 2,
                  transition: "box-shadow 0.2s ease",
                  "&:hover": { boxShadow: 3 },
                }}
              >
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                  <OfficialContactIcon type={contact.type} color="primary" />
                  <Stack>
                    <Typography variant="caption" color="text.secondary">
                      {OFFICIAL_CONTACT_TYPE_LABELS[contact.type]}
                      {contact.label ? ` · ${contact.label}` : ""}
                    </Typography>
                    <Typography sx={{ fontWeight: 500, wordBreak: "break-all" }}>
                      {contact.value}
                    </Typography>
                  </Stack>
                </Stack>
                <form action={deleteContact}>
                  <SubmitButton color="error">Eliminar</SubmitButton>
                </form>
              </Card>
            );
          })}
        </Stack>
      )}
    </PageContainer>
  );
}
