"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { executeGraphQL, runGatedMutation } from "@/lib/graphql-server";
import {
  UPDATE_RANCHO_SECTION_MUTATION,
  FEATURE_RANCHO_PHOTO_MUTATION,
  UNFEATURE_RANCHO_PHOTO_MUTATION,
} from "@/lib/queries/rancho";

export async function updateRanchoSectionAction(formData: FormData) {
  const description = String(formData.get("description") ?? "");

  await runGatedMutation(() =>
    executeGraphQL(UPDATE_RANCHO_SECTION_MUTATION, { description }),
  );

  revalidatePath("/");
  revalidatePath("/manage/rancho");
  redirect("/manage/rancho");
}

export async function featureRanchoPhotoAction(galleryItemId: string) {
  await runGatedMutation(() =>
    executeGraphQL(FEATURE_RANCHO_PHOTO_MUTATION, { galleryItemId }),
  );

  revalidatePath("/");
  revalidatePath("/manage/rancho");
  revalidatePath("/manage/rancho/add-photo");
  redirect("/manage/rancho");
}

export async function unfeatureRanchoPhotoAction(galleryItemId: string) {
  await runGatedMutation(() =>
    executeGraphQL(UNFEATURE_RANCHO_PHOTO_MUTATION, { galleryItemId }),
  );

  revalidatePath("/");
  revalidatePath("/manage/rancho");
  revalidatePath("/manage/rancho/add-photo");
  redirect("/manage/rancho");
}
