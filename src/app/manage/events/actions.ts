"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { executeGraphQL, runGatedMutation } from "@/lib/graphql-server";
import {
  CREATE_EVENT_MUTATION,
  UPDATE_EVENT_MUTATION,
  DELETE_EVENT_MUTATION,
} from "@/lib/queries/events";

function readEventInput(formData: FormData) {
  const date = formData.get("date");
  if (typeof date !== "string" || !date) {
    throw new Error("Date & time is required.");
  }
  return {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    date: new Date(date).toISOString(),
    location: String(formData.get("location") ?? ""),
  };
}

export async function createEventAction(formData: FormData) {
  const input = readEventInput(formData);
  await runGatedMutation(() =>
    executeGraphQL(CREATE_EVENT_MUTATION, { input }),
  );
  revalidatePath("/events");
  revalidatePath("/manage/events");
  redirect("/manage/events");
}

export async function updateEventAction(id: string, formData: FormData) {
  const input = readEventInput(formData);
  await runGatedMutation(() =>
    executeGraphQL(UPDATE_EVENT_MUTATION, { id, input }),
  );
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
