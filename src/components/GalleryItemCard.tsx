import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { isFacebookEmbedUrl } from "@/lib/video";

type GalleryItem = {
  id: string;
  type: "PHOTO" | "VIDEO";
  url: string;
  thumbnailUrl?: string | null;
  caption?: string | null;
};

function withAutoplay(url: string): string {
  try {
    const parsed = new URL(url);
    if (isFacebookEmbedUrl(url)) {
      // Facebook's video plugin expects string booleans, not 1/0.
      parsed.searchParams.set("autoplay", "true");
      parsed.searchParams.set("mute", "true");
    } else {
      parsed.searchParams.set("autoplay", "1");
      parsed.searchParams.set("mute", "1");
      parsed.searchParams.set("muted", "1");
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

export function GalleryItemCard({
  item,
  autoPlay = false,
}: {
  item: GalleryItem;
  autoPlay?: boolean;
}) {
  return (
    <Card
      variant="outlined"
      sx={{
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
      }}
    >
      {item.type === "PHOTO" ? (
        <CardMedia
          component="img"
          image={item.thumbnailUrl ?? item.url}
          alt={item.caption ?? ""}
          sx={{ aspectRatio: "1 / 1", objectFit: "cover" }}
        />
      ) : (
        <Box
          component="iframe"
          src={autoPlay ? withAutoplay(item.url) : item.url}
          title={item.caption ?? "Vídeo"}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          sx={{ aspectRatio: "16 / 9", width: "100%", border: 0, display: "block" }}
        />
      )}
      {item.caption && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ px: 1, py: 0.5, display: "block" }}
        >
          {item.caption}
        </Typography>
      )}
    </Card>
  );
}
