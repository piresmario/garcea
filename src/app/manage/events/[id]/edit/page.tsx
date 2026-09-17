import { notFound } from "next/navigation";
import { executeGraphQL } from "@/lib/graphql-server";
import { EVENT_QUERY } from "@/lib/queries/events";
import { EventForm } from "@/components/EventForm";
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
    <main className="mx-auto flex max-w-xl flex-1 flex-col gap-6 px-6 py-16">
      <h1 className="text-2xl font-semibold">Edit Event</h1>
      <EventForm action={updateWithId} defaultValues={data.event} submitLabel="Save" />
    </main>
  );
}
