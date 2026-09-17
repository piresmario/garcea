"use server";

import { redirect } from "next/navigation";
import { executeGraphQL } from "@/lib/graphql-server";
import { SUBMIT_CONTACT_MESSAGE_MUTATION } from "@/lib/queries/contacts";

export async function submitContactAction(formData: FormData) {
  // Honeypot: real users never see or fill this field; bots that fill every
  // field trip it. Pretend success so bots don't learn to skip it.
  const honeypot = formData.get("company");
  if (typeof honeypot === "string" && honeypot.length > 0) {
    redirect("/contacts?sent=1");
  }

  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  const message = String(formData.get("message") ?? "");

  await executeGraphQL(SUBMIT_CONTACT_MESSAGE_MUTATION, {
    input: { name, email, message },
  });

  redirect("/contacts?sent=1");
}
