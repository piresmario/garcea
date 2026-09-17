import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { PageContainer } from "@/components/PageContainer";
import { GalleryItemCard } from "@/components/GalleryItemCard";
import { executeGraphQL } from "@/lib/graphql-server";
import { RANCHO_SECTION_QUERY, RANCHO_PHOTOS_QUERY } from "@/lib/queries/rancho";

type RanchoSectionData = { ranchoSection: { description: string } | null };
type RanchoPhotosData = {
  ranchoPhotos: {
    id: string;
    type: "PHOTO" | "VIDEO";
    url: string;
    thumbnailUrl: string | null;
    caption: string | null;
  }[];
};

export default async function Home() {
  const [sectionData, photosData] = await Promise.all([
    executeGraphQL<RanchoSectionData>(RANCHO_SECTION_QUERY),
    executeGraphQL<RanchoPhotosData>(RANCHO_PHOTOS_QUERY),
  ]);

  return (
    <PageContainer maxWidth="md">
      <Typography variant="h3" component="h1" sx={{ fontWeight: 600 }}>
        Associação GARCEA
      </Typography>
      <Typography variant="h6" color="text.secondary" component="p">
        Bem-vindo ao site oficial da Associação GARCEA. Aqui pode encontrar
        informação sobre os nossos eventos, uma galeria de fotos e vídeos, e
        formas de entrar em contacto connosco.
      </Typography>

      {sectionData.ranchoSection && (
        <Stack component="section" spacing={2}>
          <Typography variant="h4" component="h2">
            Rancho Folclórico das Lavradeiras de Gondar
          </Typography>
          <Typography sx={{ whiteSpace: "pre-wrap" }}>
            {sectionData.ranchoSection.description}
          </Typography>
        </Stack>
      )}

      {photosData.ranchoPhotos.length > 0 && (
        <Stack component="section" spacing={2}>
          <Typography variant="h5" component="h3">
            Fotos
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" },
              gap: 2,
            }}
          >
            {photosData.ranchoPhotos.map((photo) => (
              <GalleryItemCard key={photo.id} item={photo} />
            ))}
          </Box>
        </Stack>
      )}
    </PageContainer>
  );
}
