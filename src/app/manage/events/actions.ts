"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  executeGraphQL,
  runGatedMutation,
  GraphQLRequestError,
} from "@/lib/graphql-server";
import { withFlash } from "@/lib/flash";
import { uploadPoster, deletePhoto } from "@/lib/supabase-storage";
import {
  CREATE_EVENT_MUTATION,
  UPDATE_EVENT_MUTATION,
  DELETE_EVENT_MUTATION,
} from "@/lib/queries/events";

const VALID_EVENT_TYPES = ["FOLCLORE", "OUTROS"];

type EventBaseInput =
  | { error: string }
  | {
      error?: undefined;
      title: string;
      description: string;
      date: string;
      location: string;
      type: string;
    };

function readEventBaseInput(formData: FormData): EventBaseInput {
  const date = formData.get("date");
  if (typeof date !== "string" || !date) {
    return { error: "A data é obrigatória." };
  }
  const type = String(formData.get("type") ?? "");
  if (!VALID_EVENT_TYPES.includes(type)) {
    return { error: "Tipo de evento inválido." };
  }
  return {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    date: new Date(date).toISOString(),
    location: String(formData.get("location") ?? ""),
    type,
  };
}

function readPosterFile(formData: FormData): File | null {
  const file = formData.get("cartaz");
  return file instanceof File && file.size > 0 ? file : null;
}

export async function createEventAction(formData: FormData) {
  const base = readEventBaseInput(formData);
  if (base.error) {
    redirect(withFlash("/manage/events/new", { error: base.error }));
  }
  const posterFile = readPosterFile(formData);

  let posterUrl: string | undefined;
  if (posterFile) {
    posterUrl = await uploadPoster(posterFile);
  }

  const input = posterUrl ? { ...base, posterUrl } : base;

  try {
    await runGatedMutation(() => executeGraphQL(CREATE_EVENT_MUTATION, { input }));
  } catch (error) {
    if (posterUrl) await deletePhoto(posterUrl).catch(() => {});
    if (error instanceof GraphQLRequestError) {
      redirect(withFlash("/manage/events/new", { error: error.message }));
    }
    throw error;
  }

  revalidatePath("/events");
  revalidatePath("/manage/events");
  redirect(withFlash("/manage/events", { success: "Evento criado com sucesso." }));
}

export async function updateEventAction(id: string, formData: FormData) {
  const editPath = `/manage/events/${id}/edit`;

  const base = readEventBaseInput(formData);
  if (base.error) {
    redirect(withFlash(editPath, { error: base.error }));
  }
  const posterFile = readPosterFile(formData);
  const removePoster = formData.get("removePoster") === "on";

  let newPosterUrl: string | undefined;
  const input: Record<string, unknown> = { ...base };

  if (posterFile) {
    newPosterUrl = await uploadPoster(posterFile);
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
    if (error instanceof GraphQLRequestError) {
      redirect(withFlash(editPath, { error: error.message }));
    }
    throw error;
  }

  revalidatePath("/events");
  revalidatePath(`/events/${id}`);
  revalidatePath("/manage/events");
  redirect(withFlash("/manage/events", { success: "Evento atualizado com sucesso." }));
}

export async function deleteEventAction(id: string) {
  await runGatedMutation(() => executeGraphQL(DELETE_EVENT_MUTATION, { id }));
  revalidatePath("/events");
  revalidatePath("/manage/events");
  redirect(withFlash("/manage/events", { success: "Evento eliminado com sucesso." }));
}
