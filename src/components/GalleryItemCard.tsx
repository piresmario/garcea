type GalleryItem = {
  id: string;
  type: "PHOTO" | "VIDEO";
  url: string;
  thumbnailUrl?: string | null;
  caption?: string | null;
};

export function GalleryItemCard({ item }: { item: GalleryItem }) {
  return (
    <figure className="flex flex-col gap-1">
      {item.type === "PHOTO" ? (
        // eslint-disable-next-line @next/next/no-img-element -- external Supabase Storage URLs, no next/image domain config needed for this scale
        <img
          src={item.thumbnailUrl ?? item.url}
          alt={item.caption ?? ""}
          className="aspect-square w-full rounded object-cover"
        />
      ) : (
        <iframe
          src={item.url}
          title={item.caption ?? "Video"}
          className="aspect-video w-full rounded"
          allowFullScreen
        />
      )}
      {item.caption && (
        <figcaption className="text-xs text-zinc-500">{item.caption}</figcaption>
      )}
    </figure>
  );
}
