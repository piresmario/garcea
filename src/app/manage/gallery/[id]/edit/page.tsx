import { notFound } from "next/navigation";
import { executeGraphQL } from "@/lib/graphql-server";
import { GALLERY_ITEM_QUERY } from "@/lib/queries/gallery";
import { updateGalleryItemAction } from "../../actions";

type GalleryItemData = { galleryItem: { caption: string | null } | null };

export default async function EditGalleryItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await executeGraphQL<GalleryItemData>(GALLERY_ITEM_QUERY, { id });

  if (!data.galleryItem) notFound();

  const updateWithId = updateGalleryItemAction.bind(null, id);

  return (
    <main className="mx-auto flex max-w-xl flex-1 flex-col gap-6 px-6 py-16">
      <h1 className="text-2xl font-semibold">Edit Caption</h1>
      <form action={updateWithId} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm">
          Caption
          <input
            type="text"
            name="caption"
            defaultValue={data.galleryItem.caption ?? ""}
            className="rounded border border-black/20 px-3 py-2 dark:border-white/20"
          />
        </label>
        <button
          type="submit"
          className="mt-2 rounded bg-foreground px-4 py-2 text-background"
        >
          Save
        </button>
      </form>
    </main>
  );
}
