const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const BUCKET = process.env.SUPABASE_STORAGE_BUCKET ?? "gallery-photos";

const MAX_PHOTO_BYTES = 8 * 1024 * 1024;

export async function uploadPhoto(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files can be uploaded as photos.");
  }
  if (file.size > MAX_PHOTO_BYTES) {
    throw new Error("Photo is too large (max 8MB).");
  }

  const arrayBuffer = await file.arrayBuffer();
  const extension = file.name.split(".").pop() || "jpg";
  const path = `${crypto.randomUUID()}.${extension}`;

  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      apikey: SERVICE_ROLE_KEY,
      "Content-Type": file.type,
    },
    body: arrayBuffer,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to upload photo: ${res.status} ${text}`);
  }

  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;
}

export async function deletePhoto(url: string): Promise<void> {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const index = url.indexOf(marker);
  if (index === -1) return; // not a file we manage in this bucket, nothing to clean up

  const path = url.slice(index + marker.length);
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${path}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      apikey: SERVICE_ROLE_KEY,
    },
  });

  if (!res.ok && res.status !== 404) {
    const text = await res.text();
    throw new Error(`Failed to delete photo: ${res.status} ${text}`);
  }
}
