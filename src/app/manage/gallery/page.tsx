import Link from "next/link";
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

export default async function ManageGalleryPage() {
  const data = await executeGraphQL<GalleryData>(GALLERY_ITEMS_QUERY);

  return (
    <main className="mx-auto flex max-w-3xl flex-1 flex-col gap-6 px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Manage Gallery</h1>
        <Link
          href="/manage/gallery/new"
          className="rounded bg-foreground px-4 py-2 text-background"
        >
          Add Item
        </Link>
      </div>
      {data.galleryItems.length === 0 ? (
        <p>No gallery items yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          {data.galleryItems.map((item) => (
            <div key={item.id} className="flex flex-col gap-2">
              <GalleryItemCard item={item} />
              <p className="text-xs text-zinc-500">
                {item.event?.title ?? "No event"}
              </p>
              <div className="flex gap-4 text-sm">
                <Link href={`/manage/gallery/${item.id}/edit`}>Edit caption</Link>
                <Link
                  href={`/manage/gallery/${item.id}/delete`}
                  className="text-red-600"
                >
                  Delete
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
