"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { executeGraphQL, runGatedMutation } from "@/lib/graphql-server";
import { uploadPhoto, deletePhoto } from "@/lib/supabase-storage";
import {
  CREATE_GALLERY_ITEM_MUTATION,
  UPDATE_GALLERY_ITEM_MUTATION,
  DELETE_GALLERY_ITEM_MUTATION,
} from "@/lib/queries/gallery";

function readCaption(formData: FormData) {
  const captionRaw = formData.get("caption");
  return typeof captionRaw === "string" && captionRaw ? captionRaw : null;
}

async function createOneGalleryItem(input: {
  type: "PHOTO" | "VIDEO";
  url: string;
  caption: string | null;
  eventId: string | null;
}) {
  try {
    await runGatedMutation(() =>
      executeGraphQL(CREATE_GALLERY_ITEM_MUTATION, { input }),
    );
  } catch (error) {
    // Don't leave an unreferenced file behind if the DB write failed.
    if (input.type === "PHOTO") {
      await deletePhoto(input.url).catch(() => {});
    }
    throw error;
  }
}

export async function createGalleryItemAction(formData: FormData) {
  const type = formData.get("type") === "VIDEO" ? "VIDEO" : "PHOTO";
  const eventIdRaw = formData.get("eventId");
  const eventId = typeof eventIdRaw === "string" && eventIdRaw ? eventIdRaw : null;
  const caption = readCaption(formData);

  if (type === "PHOTO") {
    const files = formData
      .getAll("photo")
      .filter((entry): entry is File => entry instanceof File && entry.size > 0);
    if (files.length === 0) {
      throw new Error("Please choose at least one photo to upload.");
    }

    // Sequential on purpose: fail fast and stop, rather than uploading many
    // files in parallel and having to reconcile a partial-failure state.
    for (const file of files) {
      const url = await uploadPhoto(file);
      await createOneGalleryItem({ type, url, caption, eventId });
    }
  } else {
    const videoUrl = formData.get("videoUrl");
    if (typeof videoUrl !== "string" || !videoUrl) {
      throw new Error("Please provide a video embed URL.");
    }
    await createOneGalleryItem({ type, url: videoUrl, caption, eventId });
  }

  revalidatePath("/gallery");
  if (eventId) revalidatePath(`/events/${eventId}`);
  revalidatePath("/manage/gallery");
  redirect("/manage/gallery");
}

export async function updateGalleryItemAction(id: string, formData: FormData) {
  const caption = readCaption(formData);

  await runGatedMutation(() =>
    executeGraphQL(UPDATE_GALLERY_ITEM_MUTATION, { id, input: { caption } }),
  );

  revalidatePath("/gallery");
  revalidatePath("/manage/gallery");
  redirect("/manage/gallery");
}

export async function deleteGalleryItemAction(id: string) {
  await runGatedMutation(() =>
    executeGraphQL(DELETE_GALLERY_ITEM_MUTATION, { id }),
  );

  revalidatePath("/gallery");
  revalidatePath("/manage/gallery");
  redirect("/manage/gallery");
}
