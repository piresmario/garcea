export function withFlash(
  path: string,
  params: { error?: string; success?: string },
) {
  const search = new URLSearchParams();
  if (params.error) search.set("error", params.error);
  if (params.success) search.set("success", params.success);

  const query = search.toString();
  return query ? `${path}?${query}` : path;
}
