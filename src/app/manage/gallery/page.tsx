import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { executeGraphQL } from "@/lib/graphql-server";
import { GALLERY_ITEMS_QUERY } from "@/lib/queries/gallery";
import { GalleryItemCard } from "@/components/GalleryItemCard";
import { PageContainer } from "@/components/PageContainer";

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

export default async function ManageGalleryPage() {
  const data = await executeGraphQL<GalleryData>(GALLERY_ITEMS_QUERY);

  return (
    <PageContainer maxWidth="md">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" component="h1">
          Gerir Galeria
        </Typography>
        <Button href="/manage/gallery/new" variant="contained">
          Adicionar Item
        </Button>
      </Box>
      {data.galleryItems.length === 0 ? (
        <Typography>Ainda não há itens na galeria.</Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" },
            gap: 3,
          }}
        >
          {data.galleryItems.map((item) => (
            <Stack key={item.id} spacing={1}>
              <GalleryItemCard item={item} />
              <Typography variant="caption" color="text.secondary">
                {item.event?.title ?? "Sem evento"}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button href={`/manage/gallery/${item.id}/edit`} size="small">
                  Editar legenda
                </Button>
                <Button
                  href={`/manage/gallery/${item.id}/delete`}
                  size="small"
                  color="error"
                >
                  Eliminar
                </Button>
              </Stack>
            </Stack>
          ))}
        </Box>
      )}
    </PageContainer>
  );
}
