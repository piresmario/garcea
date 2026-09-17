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

export async function createGalleryItemAction(formData: FormData) {
  const type = formData.get("type") === "VIDEO" ? "VIDEO" : "PHOTO";
  const eventIdRaw = formData.get("eventId");
  const eventId = typeof eventIdRaw === "string" && eventIdRaw ? eventIdRaw : null;
  const caption = readCaption(formData);

  let url: string;
  if (type === "PHOTO") {
    const file = formData.get("photo");
    if (!(file instanceof File) || file.size === 0) {
      throw new Error("Please choose a photo to upload.");
    }
    url = await uploadPhoto(file);
  } else {
    const videoUrl = formData.get("videoUrl");
    if (typeof videoUrl !== "string" || !videoUrl) {
      throw new Error("Please provide a video embed URL.");
    }
    url = videoUrl;
  }

  try {
    await runGatedMutation(() =>
      executeGraphQL(CREATE_GALLERY_ITEM_MUTATION, {
        input: { type, url, caption, eventId },
      }),
    );
  } catch (error) {
    // Don't leave an unreferenced file behind if the DB write failed.
    if (type === "PHOTO") {
      await deletePhoto(url).catch(() => {});
    }
    throw error;
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
