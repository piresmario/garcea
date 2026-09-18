import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
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
    <>
      <Box
        sx={{
          background: "linear-gradient(135deg, #0340d8 0%, #062a8f 100%)",
          color: "common.white",
          py: { xs: 8, sm: 12 },
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography variant="h2" component="h1" sx={{ fontSize: { xs: "2.25rem", sm: "3rem" } }}>
            Associação GARCEA
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{ mt: 2, mb: 4, opacity: 0.9, fontWeight: 400 }}
          >
            Bem-vindo ao site oficial da Associação GARCEA. Aqui pode encontrar
            informação sobre os nossos eventos, uma galeria de fotos e vídeos, e
            formas de entrar em contacto connosco.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ justifyContent: "center" }}
          >
            <Button href="/events" variant="contained" color="secondary" size="large">
              Ver Eventos
            </Button>
            <Button
              href="/historial"
              variant="outlined"
              size="large"
              sx={{
                color: "common.white",
                borderColor: "rgba(255,255,255,0.6)",
                "&:hover": { borderColor: "common.white", bgcolor: "rgba(255,255,255,0.08)" },
              }}
            >
              Conhecer a Nossa História
            </Button>
          </Stack>
        </Container>
      </Box>

      <PageContainer maxWidth="md">
        <Paper
          component="section"
          variant="outlined"
          sx={{ p: { xs: 3, sm: 5 }, display: "flex", flexDirection: "column", gap: 3 }}
        >
          <Typography variant="h4" component="h2">
            Rancho Folclórico das Lavradeiras de Gondar
          </Typography>

          {sectionData.ranchoSection && (
            <Typography sx={{ whiteSpace: "pre-wrap" }}>
              {sectionData.ranchoSection.description}
            </Typography>
          )}

          <Stack spacing={2}>
            <Typography variant="h5" component="h3">
              Galeria de Fotos
            </Typography>
            {photosData.ranchoPhotos.length > 0 ? (
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
            ) : (
              <Typography color="text.secondary">Sem fotos por enquanto.</Typography>
            )}
          </Stack>
        </Paper>
      </PageContainer>
    </>
  );
}
