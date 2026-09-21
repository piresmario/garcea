import { notFound } from "next/navigation";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { executeGraphQL } from "@/lib/graphql-server";
import { EVENT_QUERY } from "@/lib/queries/events";
import { PageContainer } from "@/components/PageContainer";
import { SubmitButton } from "@/components/SubmitButton";
import { deleteEventAction } from "../../actions";

type EventData = { event: { title: string } | null };

export default async function DeleteEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await executeGraphQL<EventData>(EVENT_QUERY, { id });

  if (!data.event) notFound();

  const deleteWithId = deleteEventAction.bind(null, id);

  return (
    <PageContainer maxWidth="sm">
      <Typography variant="h4" component="h1">
        Eliminar Evento
      </Typography>
      <Typography>
        Tem a certeza que deseja eliminar &ldquo;{data.event.title}&rdquo;? Esta
        ação não pode ser desfeita.
      </Typography>
      <Stack component="form" action={deleteWithId} direction="row" spacing={2}>
        <SubmitButton variant="contained" color="error">
          Eliminar
        </SubmitButton>
        <Button href="/manage/events" variant="outlined">
          Cancelar
        </Button>
      </Stack>
    </PageContainer>
  );
}
