import { notFound } from "next/navigation";
import Typography from "@mui/material/Typography";
import { executeGraphQL } from "@/lib/graphql-server";
import { EVENT_QUERY } from "@/lib/queries/events";
import { EventForm } from "@/components/EventForm";
import { PageContainer } from "@/components/PageContainer";
import { updateEventAction } from "../../actions";

type EventData = {
  event: {
    title: string;
    description: string;
    date: string;
    location: string;
  } | null;
};

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await executeGraphQL<EventData>(EVENT_QUERY, { id });

  if (!data.event) notFound();

  const updateWithId = updateEventAction.bind(null, id);

  return (
    <PageContainer maxWidth="sm">
      <Typography variant="h4" component="h1">
        Edit Event
      </Typography>
      <EventForm action={updateWithId} defaultValues={data.event} submitLabel="Save" />
    </PageContainer>
  );
}
