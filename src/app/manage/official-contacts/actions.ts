"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { executeGraphQL, runGatedMutation } from "@/lib/graphql-server";
import {
  CREATE_OFFICIAL_CONTACT_MUTATION,
  DELETE_OFFICIAL_CONTACT_MUTATION,
} from "@/lib/queries/officialContacts";

export async function createOfficialContactAction(formData: FormData) {
  const type = String(formData.get("type") ?? "");
  const value = String(formData.get("value") ?? "").trim();

  if (type !== "EMAIL" && type !== "PHONE") {
    throw new Error("Tipo de contacto inválido.");
  }
  if (!value) {
    throw new Error("O valor do contacto é obrigatório.");
  }

  await runGatedMutation(() =>
    executeGraphQL(CREATE_OFFICIAL_CONTACT_MUTATION, { input: { type, value } }),
  );

  revalidatePath("/contacts");
  revalidatePath("/manage/official-contacts");
  redirect("/manage/official-contacts");
}

export async function deleteOfficialContactAction(id: string) {
  await runGatedMutation(() =>
    executeGraphQL(DELETE_OFFICIAL_CONTACT_MUTATION, { id }),
  );

  revalidatePath("/contacts");
  revalidatePath("/manage/official-contacts");
  redirect("/manage/official-contacts");
}
