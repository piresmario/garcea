import { notFound } from "next/navigation";
import { executeGraphQL } from "@/lib/graphql-server";
import { EVENT_QUERY } from "@/lib/queries/events";
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
    <main className="mx-auto flex max-w-xl flex-1 flex-col gap-6 px-6 py-16">
      <h1 className="text-2xl font-semibold">Delete Event</h1>
      <p>
        Are you sure you want to delete &ldquo;{data.event.title}&rdquo;? This
        cannot be undone.
      </p>
      <form action={deleteWithId} className="flex gap-4">
        <button type="submit" className="rounded bg-red-600 px-4 py-2 text-white">
          Delete
        </button>
        <a
          href="/manage/events"
          className="rounded border border-black/20 px-4 py-2 dark:border-white/20"
        >
          Cancel
        </a>
      </form>
    </main>
  );
}
