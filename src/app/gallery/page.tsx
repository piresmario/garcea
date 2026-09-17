import { executeGraphQL } from "@/lib/graphql-server";
import { GALLERY_ITEMS_QUERY } from "@/lib/queries/gallery";
import { GalleryItemCard } from "@/components/GalleryItemCard";

type GalleryData = {
  galleryItems: {
    id: string;
    type: "PHOTO" | "VIDEO";
    url: string;
    thumbnailUrl: string | null;
    caption: string | null;
    event: { id: string; title: string } | null;
  }[];
};

export default async function GalleryPage() {
  const data = await executeGraphQL<GalleryData>(GALLERY_ITEMS_QUERY);

  if (data.galleryItems.length === 0) {
    return (
      <main className="mx-auto flex max-w-3xl flex-1 flex-col gap-4 px-6 py-16">
        <h1 className="text-2xl font-semibold">Gallery</h1>
        <p>No photos or videos yet.</p>
      </main>
    );
  }

  const groups = new Map<
    string,
    { title: string; items: GalleryData["galleryItems"] }
  >();
  for (const item of data.galleryItems) {
    const key = item.event?.id ?? "none";
    const title = item.event?.title ?? "Other";
    if (!groups.has(key)) groups.set(key, { title, items: [] });
    groups.get(key)!.items.push(item);
  }

  return (
    <main className="mx-auto flex max-w-3xl flex-1 flex-col gap-10 px-6 py-16">
      <h1 className="text-2xl font-semibold">Gallery</h1>
      {Array.from(groups.values()).map((group) => (
        <section key={group.title} className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">{group.title}</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {group.items.map((item) => (
              <GalleryItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
