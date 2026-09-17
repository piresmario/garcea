import { notFound } from "next/navigation";
import { executeGraphQL } from "@/lib/graphql-server";
import { EVENT_QUERY } from "@/lib/queries/events";
import { GalleryItemCard } from "@/components/GalleryItemCard";

type EventData = {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    createdBy: { name: string };
    galleryItems: {
      id: string;
      type: "PHOTO" | "VIDEO";
      url: string;
      thumbnailUrl: string | null;
      caption: string | null;
    }[];
  } | null;
};

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await executeGraphQL<EventData>(EVENT_QUERY, { id });

  if (!data.event) notFound();

  const event = data.event;

  return (
    <main className="mx-auto flex max-w-3xl flex-1 flex-col gap-6 px-6 py-16">
      <h1 className="text-2xl font-semibold">{event.title}</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {new Date(event.date).toLocaleString("pt-PT")} · {event.location}
      </p>
      <p>{event.description}</p>

      {event.galleryItems.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Gallery</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {event.galleryItems.map((item) => (
              <GalleryItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
