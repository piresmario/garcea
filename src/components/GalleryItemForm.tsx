"use client";

import { useState } from "react";

type EventOption = { id: string; title: string };

export function GalleryItemForm({
  action,
  events,
}: {
  action: (formData: FormData) => void | Promise<void>;
  events: EventOption[];
}) {
  const [type, setType] = useState<"PHOTO" | "VIDEO">("PHOTO");

  return (
    <form action={action} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        Type
        <select
          name="type"
          value={type}
          onChange={(event) => setType(event.target.value as "PHOTO" | "VIDEO")}
          className="rounded border border-black/20 px-3 py-2 dark:border-white/20"
        >
          <option value="PHOTO">Photo</option>
          <option value="VIDEO">Video</option>
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Event (optional)
        <select
          name="eventId"
          defaultValue=""
          className="rounded border border-black/20 px-3 py-2 dark:border-white/20"
        >
          <option value="">None</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.title}
            </option>
          ))}
        </select>
      </label>

      {type === "PHOTO" ? (
        <label className="flex flex-col gap-1 text-sm">
          Photo file
          <input type="file" name="photo" accept="image/*" required className="text-sm" />
        </label>
      ) : (
        <label className="flex flex-col gap-1 text-sm">
          Video embed URL
          <input
            type="url"
            name="videoUrl"
            required
            placeholder="https://www.youtube.com/embed/VIDEO_ID"
            className="rounded border border-black/20 px-3 py-2 dark:border-white/20"
          />
        </label>
      )}

      <label className="flex flex-col gap-1 text-sm">
        Caption (optional)
        <input
          type="text"
          name="caption"
          className="rounded border border-black/20 px-3 py-2 dark:border-white/20"
        />
      </label>

      <button
        type="submit"
        className="mt-2 rounded bg-foreground px-4 py-2 text-background"
      >
        Upload
      </button>
    </form>
  );
}
