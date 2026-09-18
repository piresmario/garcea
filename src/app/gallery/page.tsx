import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import { executeGraphQL } from "@/lib/graphql-server";
import { GALLERY_ITEMS_QUERY } from "@/lib/queries/gallery";
import { GalleryItemCard } from "@/components/GalleryItemCard";
import { PageContainer } from "@/components/PageContainer";
import { PageTitle } from "@/components/PageTitle";

type GalleryData = {
  galleryItems: {
    id: string;
    type: "PHOTO" | "VIDEO";
    url: string;
    thumbnailUrl: string | null;
    caption: string | null;
    event: { id: string; title: string } | null;
  }[];
};

export default async function GalleryPage() {
  const data = await executeGraphQL<GalleryData>(GALLERY_ITEMS_QUERY);

  if (data.galleryItems.length === 0) {
    return (
      <PageContainer maxWidth="md">
        <PageTitle icon={<PhotoLibraryIcon />}>Galeria</PageTitle>
        <Typography>Ainda não há fotos ou vídeos.</Typography>
      </PageContainer>
    );
  }

  const groups = new Map<
    string,
    { title: string; items: GalleryData["galleryItems"] }
  >();
  for (const item of data.galleryItems) {
    const key = item.event?.id ?? "none";
    const title = item.event?.title ?? "Outros";
    if (!groups.has(key)) groups.set(key, { title, items: [] });
    groups.get(key)!.items.push(item);
  }

  return (
    <PageContainer maxWidth="md">
      <PageTitle icon={<PhotoLibraryIcon />}>Galeria</PageTitle>
      {Array.from(groups.values()).map((group) => (
        <Stack key={group.title} spacing={2}>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Typography variant="h5" component="h2">
              {group.title}
            </Typography>
            <Chip size="small" color="primary" label={group.items.length} />
          </Stack>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" },
              gap: 2,
            }}
          >
            {group.items.map((item) => (
              <GalleryItemCard key={item.id} item={item} />
            ))}
          </Box>
        </Stack>
      ))}
    </PageContainer>
  );
}
