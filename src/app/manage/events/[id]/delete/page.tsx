import { notFound } from "next/navigation";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { executeGraphQL } from "@/lib/graphql-server";
import { EVENT_QUERY } from "@/lib/queries/events";
import { PageContainer } from "@/components/PageContainer";
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
        Delete Event
      </Typography>
      <Typography>
        Are you sure you want to delete &ldquo;{data.event.title}&rdquo;? This
        cannot be undone.
      </Typography>
      <Stack component="form" action={deleteWithId} direction="row" spacing={2}>
        <Button type="submit" variant="contained" color="error">
          Delete
        </Button>
        <Button href="/manage/events" variant="outlined">
          Cancel
        </Button>
      </Stack>
    </PageContainer>
  );
}
