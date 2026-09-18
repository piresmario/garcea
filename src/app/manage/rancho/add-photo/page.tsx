import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { executeGraphQL } from "@/lib/graphql-server";
import { GALLERY_ITEMS_FOR_PICKER_QUERY } from "@/lib/queries/rancho";
import { PageContainer } from "@/components/PageContainer";
import { GalleryItemCard } from "@/components/GalleryItemCard";
import { featureRanchoPhotoAction } from "../actions";

type GalleryItemsData = {
  galleryItems: {
    id: string;
    type: "PHOTO" | "VIDEO";
    url: string;
    thumbnailUrl: string | null;
    caption: string | null;
    isFeaturedInRancho: boolean;
  }[];
};

export default async function AddRanchoPhotoPage() {
  const data = await executeGraphQL<GalleryItemsData>(GALLERY_ITEMS_FOR_PICKER_QUERY);
  const available = data.galleryItems.filter((item) => !item.isFeaturedInRancho);

  return (
    <PageContainer maxWidth="md">
      <Typography variant="h4" component="h1">
        Adicionar Foto à Secção do Rancho
      </Typography>
      {available.length === 0 ? (
        <Typography>
          Não há itens da galeria disponíveis. Carregue fotos em Gerir Galeria
          primeiro.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" },
            gap: 3,
          }}
        >
          {available.map((item) => {
            const feature = featureRanchoPhotoAction.bind(null, item.id);
            return (
              <Stack key={item.id} spacing={1}>
                <GalleryItemCard item={item} />
                <form action={feature}>
                  <Button type="submit" size="small" variant="contained">
                    Destacar na Página Inicial
                  </Button>
                </form>
              </Stack>
            );
          })}
        </Box>
      )}
    </PageContainer>
  );
}
