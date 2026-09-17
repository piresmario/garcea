"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { executeGraphQL } from "@/lib/graphql-server";
import { uploadPhoto } from "@/lib/supabase-storage";
import {
  CREATE_GALLERY_ITEM_MUTATION,
  UPDATE_GALLERY_ITEM_MUTATION,
  DELETE_GALLERY_ITEM_MUTATION,
} from "@/lib/queries/gallery";

export async function createGalleryItemAction(formData: FormData) {
  const type = formData.get("type") === "VIDEO" ? "VIDEO" : "PHOTO";
  const eventIdRaw = formData.get("eventId");
  const eventId = typeof eventIdRaw === "string" && eventIdRaw ? eventIdRaw : null;
  const captionRaw = formData.get("caption");
  const caption = typeof captionRaw === "string" && captionRaw ? captionRaw : null;

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

  await executeGraphQL(CREATE_GALLERY_ITEM_MUTATION, {
    input: { type, url, caption, eventId },
  });

  revalidatePath("/gallery");
  if (eventId) revalidatePath(`/events/${eventId}`);
  revalidatePath("/manage/gallery");
  redirect("/manage/gallery");
}

export async function updateGalleryItemAction(id: string, formData: FormData) {
  const captionRaw = formData.get("caption");
  const caption = typeof captionRaw === "string" ? captionRaw : null;

  await executeGraphQL(UPDATE_GALLERY_ITEM_MUTATION, { id, input: { caption } });

  revalidatePath("/gallery");
  revalidatePath("/manage/gallery");
  redirect("/manage/gallery");
}

export async function deleteGalleryItemAction(id: string) {
  await executeGraphQL(DELETE_GALLERY_ITEM_MUTATION, { id });

  revalidatePath("/gallery");
  revalidatePath("/manage/gallery");
  redirect("/manage/gallery");
}
