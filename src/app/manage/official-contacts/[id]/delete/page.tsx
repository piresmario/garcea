import { notFound } from "next/navigation";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { executeGraphQL } from "@/lib/graphql-server";
import { OFFICIAL_CONTACTS_QUERY } from "@/lib/queries/officialContacts";
import { PageContainer } from "@/components/PageContainer";
import { SubmitButton } from "@/components/SubmitButton";
import { OFFICIAL_CONTACT_TYPE_LABELS } from "@/components/OfficialContactIcon";
import { deleteOfficialContactAction } from "../../actions";

type OfficialContactsData = {
  officialContacts: {
    id: string;
    type: "EMAIL" | "PHONE" | "FACEBOOK";
    label: string | null;
    value: string;
  }[];
};

export default async function DeleteOfficialContactPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await executeGraphQL<OfficialContactsData>(OFFICIAL_CONTACTS_QUERY);
  const contact = data.officialContacts.find((item) => item.id === id);

  if (!contact) notFound();

  const deleteWithId = deleteOfficialContactAction.bind(null, id);

  return (
    <PageContainer maxWidth="sm">
      <Typography variant="h4" component="h1">
        Eliminar Contacto Oficial
      </Typography>
      <Typography>
        Tem a certeza que deseja eliminar o contacto de{" "}
        {OFFICIAL_CONTACT_TYPE_LABELS[contact.type]} &ldquo;{contact.value}
        &rdquo;? Esta ação não pode ser desfeita.
      </Typography>
      <Stack component="form" action={deleteWithId} direction="row" spacing={2}>
        <SubmitButton variant="contained" color="error">
          Eliminar
        </SubmitButton>
        <Button href="/manage/official-contacts" variant="outlined">
          Cancelar
        </Button>
      </Stack>
    </PageContainer>
  );
}
