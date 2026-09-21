"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { executeGraphQL, runGatedMutation } from "@/lib/graphql-server";
import {
  CREATE_HOME_SECTION_MUTATION,
  UPDATE_HOME_SECTION_MUTATION,
  DELETE_HOME_SECTION_MUTATION,
  MOVE_HOME_SECTION_MUTATION,
  FEATURE_HOME_SECTION_PHOTO_MUTATION,
  UNFEATURE_HOME_SECTION_PHOTO_MUTATION,
} from "@/lib/queries/homeSections";

function readHomeSectionInput(formData: FormData) {
  return {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
  };
}

export async function createHomeSectionAction(formData: FormData) {
  const input = readHomeSectionInput(formData);

  await runGatedMutation(() =>
    executeGraphQL(CREATE_HOME_SECTION_MUTATION, { input }),
  );

  revalidatePath("/");
  revalidatePath("/manage/home-sections");
  redirect("/manage/home-sections");
}

export async function updateHomeSectionAction(id: string, formData: FormData) {
  const input = readHomeSectionInput(formData);

  await runGatedMutation(() =>
    executeGraphQL(UPDATE_HOME_SECTION_MUTATION, { id, input }),
  );

  revalidatePath("/");
  revalidatePath("/manage/home-sections");
  redirect("/manage/home-sections");
}

export async function deleteHomeSectionAction(id: string) {
  await runGatedMutation(() => executeGraphQL(DELETE_HOME_SECTION_MUTATION, { id }));

  revalidatePath("/");
  revalidatePath("/manage/home-sections");
  redirect("/manage/home-sections");
}

export async function moveHomeSectionAction(id: string, direction: "UP" | "DOWN") {
  await runGatedMutation(() =>
    executeGraphQL(MOVE_HOME_SECTION_MUTATION, { id, direction }),
  );

  revalidatePath("/");
  revalidatePath("/manage/home-sections");
  redirect("/manage/home-sections");
}

export async function featureHomeSectionPhotoAction(
  homeSectionId: string,
  galleryItemId: string,
) {
  await runGatedMutation(() =>
    executeGraphQL(FEATURE_HOME_SECTION_PHOTO_MUTATION, { homeSectionId, galleryItemId }),
  );

  revalidatePath("/");
  revalidatePath(`/manage/home-sections/${homeSectionId}`);
  revalidatePath(`/manage/home-sections/${homeSectionId}/add-photo`);
  redirect(`/manage/home-sections/${homeSectionId}`);
}

export async function unfeatureHomeSectionPhotoAction(
  homeSectionId: string,
  galleryItemId: string,
) {
  await runGatedMutation(() =>
    executeGraphQL(UNFEATURE_HOME_SECTION_PHOTO_MUTATION, { homeSectionId, galleryItemId }),
  );

  revalidatePath("/");
  revalidatePath(`/manage/home-sections/${homeSectionId}`);
  revalidatePath(`/manage/home-sections/${homeSectionId}/add-photo`);
  redirect(`/manage/home-sections/${homeSectionId}`);
}
