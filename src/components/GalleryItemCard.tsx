import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type GalleryItem = {
  id: string;
  type: "PHOTO" | "VIDEO";
  url: string;
  thumbnailUrl?: string | null;
  caption?: string | null;
};

export function GalleryItemCard({ item }: { item: GalleryItem }) {
  return (
    <Card variant="outlined">
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
          src={item.url}
          title={item.caption ?? "Vídeo"}
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
