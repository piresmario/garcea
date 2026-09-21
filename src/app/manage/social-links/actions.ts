"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { executeGraphQL, runGatedMutation } from "@/lib/graphql-server";
import {
  CREATE_SOCIAL_LINK_MUTATION,
  DELETE_SOCIAL_LINK_MUTATION,
} from "@/lib/queries/socialLinks";

const VALID_PLATFORMS = [
  "FACEBOOK",
  "INSTAGRAM",
  "YOUTUBE",
  "TWITTER",
  "WHATSAPP",
  "SPOTIFY",
  "OTHER",
];

export async function createSocialLinkAction(formData: FormData) {
  const platform = String(formData.get("platform") ?? "");
  const url = String(formData.get("url") ?? "").trim();

  if (!VALID_PLATFORMS.includes(platform)) {
    throw new Error("Plataforma inválida.");
  }
  if (!url) {
    throw new Error("O link é obrigatório.");
  }

  await runGatedMutation(() =>
    executeGraphQL(CREATE_SOCIAL_LINK_MUTATION, { input: { platform, url } }),
  );

  revalidatePath("/");
  revalidatePath("/manage/social-links");
  redirect("/manage/social-links");
}

export async function deleteSocialLinkAction(id: string) {
  await runGatedMutation(() => executeGraphQL(DELETE_SOCIAL_LINK_MUTATION, { id }));

  revalidatePath("/");
  revalidatePath("/manage/social-links");
  redirect("/manage/social-links");
}
