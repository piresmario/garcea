"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { executeGraphQL } from "@/lib/graphql-server";
import {
  CREATE_EVENT_MUTATION,
  UPDATE_EVENT_MUTATION,
  DELETE_EVENT_MUTATION,
} from "@/lib/queries/events";

function readEventInput(formData: FormData) {
  const date = formData.get("date");
  return {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    date: date ? new Date(String(date)).toISOString() : new Date().toISOString(),
    location: String(formData.get("location") ?? ""),
  };
}

export async function createEventAction(formData: FormData) {
  await executeGraphQL(CREATE_EVENT_MUTATION, { input: readEventInput(formData) });
  revalidatePath("/events");
  revalidatePath("/manage/events");
  redirect("/manage/events");
}

export async function updateEventAction(id: string, formData: FormData) {
  await executeGraphQL(UPDATE_EVENT_MUTATION, {
    id,
    input: readEventInput(formData),
  });
  revalidatePath("/events");
  revalidatePath(`/events/${id}`);
  revalidatePath("/manage/events");
  redirect("/manage/events");
}

export async function deleteEventAction(id: string) {
  await executeGraphQL(DELETE_EVENT_MUTATION, { id });
  revalidatePath("/events");
  revalidatePath("/manage/events");
  redirect("/manage/events");
}
