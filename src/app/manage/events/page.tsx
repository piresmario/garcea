import Link from "next/link";
import { executeGraphQL } from "@/lib/graphql-server";
import { EVENTS_QUERY } from "@/lib/queries/events";

type EventsData = {
  events: {
    id: string;
    title: string;
    date: string;
    location: string;
  }[];
};

export default async function ManageEventsPage() {
  const data = await executeGraphQL<EventsData>(EVENTS_QUERY);

  return (
    <main className="mx-auto flex max-w-3xl flex-1 flex-col gap-6 px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Manage Events</h1>
        <Link
          href="/manage/events/new"
          className="rounded bg-foreground px-4 py-2 text-background"
        >
          New Event
        </Link>
      </div>
      {data.events.length === 0 ? (
        <p>No events yet.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {data.events.map((event) => (
            <li
              key={event.id}
              className="flex items-center justify-between rounded border border-black/10 p-4 dark:border-white/10"
            >
              <div>
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {new Date(event.date).toLocaleString("pt-PT")} · {event.location}
                </p>
              </div>
              <div className="flex gap-4 text-sm">
                <Link href={`/manage/events/${event.id}/edit`}>Edit</Link>
                <Link
                  href={`/manage/events/${event.id}/delete`}
                  className="text-red-600"
                >
                  Delete
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
