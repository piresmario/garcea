import { executeGraphQL } from "@/lib/graphql-server";
import { EVENTS_QUERY } from "@/lib/queries/events";
import { GalleryItemForm } from "@/components/GalleryItemForm";
import { createGalleryItemAction } from "../actions";

type EventsData = { events: { id: string; title: string }[] };

export default async function NewGalleryItemPage() {
  const data = await executeGraphQL<EventsData>(EVENTS_QUERY);

  return (
    <main className="mx-auto flex max-w-xl flex-1 flex-col gap-6 px-6 py-16">
      <h1 className="text-2xl font-semibold">Add Gallery Item</h1>
      <GalleryItemForm action={createGalleryItemAction} events={data.events} />
    </main>
  );
}
