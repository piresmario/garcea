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

export default async function EventsPage() {
  const data = await executeGraphQL<EventsData>(EVENTS_QUERY);

  return (
    <main className="mx-auto flex max-w-3xl flex-1 flex-col gap-6 px-6 py-16">
      <h1 className="text-2xl font-semibold">Events</h1>
      {data.events.length === 0 ? (
        <p>No events yet.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {data.events.map((event) => (
            <li
              key={event.id}
              className="rounded border border-black/10 p-4 dark:border-white/10"
            >
              <Link href={`/events/${event.id}`} className="text-lg font-medium">
                {event.title}
              </Link>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {new Date(event.date).toLocaleDateString("pt-PT")} · {event.location}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
