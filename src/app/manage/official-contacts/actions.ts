"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  executeGraphQL,
  runGatedMutation,
  GraphQLRequestError,
} from "@/lib/graphql-server";
import { withFlash } from "@/lib/flash";
import {
  CREATE_OFFICIAL_CONTACT_MUTATION,
  DELETE_OFFICIAL_CONTACT_MUTATION,
} from "@/lib/queries/officialContacts";

const VALID_TYPES = ["EMAIL", "PHONE", "FACEBOOK"];

export async function createOfficialContactAction(formData: FormData) {
  const type = String(formData.get("type") ?? "");
  const label = String(formData.get("label") ?? "").trim();
  const value = String(formData.get("value") ?? "").trim();

  if (!VALID_TYPES.includes(type)) {
    redirect(
      withFlash("/manage/official-contacts", { error: "Tipo de contacto inválido." }),
    );
  }
  if (!value) {
    redirect(
      withFlash("/manage/official-contacts", {
        error: "O valor do contacto é obrigatório.",
      }),
    );
  }

  try {
    await runGatedMutation(() =>
      executeGraphQL(CREATE_OFFICIAL_CONTACT_MUTATION, {
        input: { type, label: label || null, value },
      }),
    );
  } catch (error) {
    if (error instanceof GraphQLRequestError) {
      redirect(withFlash("/manage/official-contacts", { error: error.message }));
    }
    throw error;
  }

  revalidatePath("/contacts");
  revalidatePath("/manage/official-contacts");
  redirect(
    withFlash("/manage/official-contacts", {
      success: "Contacto adicionado com sucesso.",
    }),
  );
}

export async function deleteOfficialContactAction(id: string) {
  await runGatedMutation(() =>
    executeGraphQL(DELETE_OFFICIAL_CONTACT_MUTATION, { id }),
  );

  revalidatePath("/contacts");
  revalidatePath("/manage/official-contacts");
  redirect(
    withFlash("/manage/official-contacts", {
      success: "Contacto eliminado com sucesso.",
    }),
  );
}
