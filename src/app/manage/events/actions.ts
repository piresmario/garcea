"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { executeGraphQL, runGatedMutation } from "@/lib/graphql-server";
import { uploadPhoto, deletePhoto } from "@/lib/supabase-storage";
import {
  CREATE_EVENT_MUTATION,
  UPDATE_EVENT_MUTATION,
  DELETE_EVENT_MUTATION,
} from "@/lib/queries/events";

function readEventBaseInput(formData: FormData) {
  const date = formData.get("date");
  if (typeof date !== "string" || !date) {
    throw new Error("A data é obrigatória.");
  }
  return {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    date: new Date(date).toISOString(),
    location: String(formData.get("location") ?? ""),
  };
}

function readPosterFile(formData: FormData): File | null {
  const file = formData.get("cartaz");
  return file instanceof File && file.size > 0 ? file : null;
}

export async function createEventAction(formData: FormData) {
  const base = readEventBaseInput(formData);
  const posterFile = readPosterFile(formData);

  let posterUrl: string | undefined;
  if (posterFile) {
    posterUrl = await uploadPhoto(posterFile);
  }

  const input = posterUrl ? { ...base, posterUrl } : base;

  try {
    await runGatedMutation(() => executeGraphQL(CREATE_EVENT_MUTATION, { input }));
  } catch (error) {
    if (posterUrl) await deletePhoto(posterUrl).catch(() => {});
    throw error;
  }

  revalidatePath("/events");
  revalidatePath("/manage/events");
  redirect("/manage/events");
}

export async function updateEventAction(id: string, formData: FormData) {
  const base = readEventBaseInput(formData);
  const posterFile = readPosterFile(formData);
  const removePoster = formData.get("removePoster") === "on";

  let newPosterUrl: string | undefined;
  const input: Record<string, unknown> = { ...base };

  if (posterFile) {
    newPosterUrl = await uploadPhoto(posterFile);
    input.posterUrl = newPosterUrl;
  } else if (removePoster) {
    input.posterUrl = null;
  }

  try {
    await runGatedMutation(() =>
      executeGraphQL(UPDATE_EVENT_MUTATION, { id, input }),
    );
  } catch (error) {
    // The resolver cleans up the *old* poster on success; on failure here,
    // clean up the *newly* uploaded one instead so it isn't orphaned.
    if (newPosterUrl) await deletePhoto(newPosterUrl).catch(() => {});
    throw error;
  }

  revalidatePath("/events");
  revalidatePath(`/events/${id}`);
  revalidatePath("/manage/events");
  redirect("/manage/events");
}

export async function deleteEventAction(id: string) {
  await runGatedMutation(() => executeGraphQL(DELETE_EVENT_MUTATION, { id }));
  revalidatePath("/events");
  revalidatePath("/manage/events");
  redirect("/manage/events");
}
