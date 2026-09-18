/**
 * Accepts a plain YouTube or Facebook video link (watch page, share link,
 * short link, etc.) and converts it to a URL that actually works as an
 * <iframe> embed. Anything else is passed through unchanged, so a
 * already-built embed URL (YouTube, Vimeo, ...) still works as before.
 */
export function normalizeVideoUrl(rawUrl: string): string {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new Error("O link do vídeo não é um URL válido.");
  }

  const host = url.hostname.replace(/^(www|m)\./, "");

  if (host === "youtube.com") {
    if (url.pathname.startsWith("/embed/")) return url.toString();
    const videoId = url.searchParams.get("v");
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    const shortsMatch = url.pathname.match(/^\/shorts\/([^/]+)/);
    if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`;
    throw new Error("Não foi possível identificar o vídeo nesse link do YouTube.");
  }

  if (host === "youtu.be") {
    const videoId = url.pathname.slice(1);
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    throw new Error("Não foi possível identificar o vídeo nesse link do YouTube.");
  }

  if (host === "facebook.com" || host === "fb.watch") {
    if (url.pathname.startsWith("/plugins/video.php")) return url.toString();
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(rawUrl)}&show_text=false`;
  }

  return rawUrl;
}

export function isFacebookEmbedUrl(url: string): boolean {
  try {
    return new URL(url).hostname.replace(/^www\./, "") === "facebook.com";
  } catch {
    return false;
  }
}
