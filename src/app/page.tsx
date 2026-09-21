import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { PageContainer } from "@/components/PageContainer";
import { GalleryCarousel } from "@/components/GalleryCarousel";
import { executeGraphQL } from "@/lib/graphql-server";
import { HOME_SECTIONS_QUERY } from "@/lib/queries/homeSections";

type HomeSectionsData = {
  homeSections: {
    id: string;
    title: string;
    description: string;
    featuredPhotos: {
      id: string;
      type: "PHOTO" | "VIDEO";
      url: string;
      thumbnailUrl: string | null;
      caption: string | null;
    }[];
  }[];
};

export default async function Home() {
  const { homeSections } = await executeGraphQL<HomeSectionsData>(HOME_SECTIONS_QUERY);

  return (
    <>
      <Box
        sx={{
          background: "linear-gradient(135deg, #0340d8 0%, #062a8f 100%)",
          color: "common.white",
          py: { xs: 4, sm: 6 },
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography
            variant="h6"
            component="h1"
            sx={{ mb: 3, opacity: 0.9, fontWeight: 400 }}
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
        {homeSections.map((section) => (
          <Paper
            key={section.id}
            component="section"
            variant="outlined"
            sx={{ p: { xs: 3, sm: 5 }, display: "flex", flexDirection: "column", gap: 3 }}
          >
            <Typography variant="h4" component="h2">
              {section.title}
            </Typography>

            <Typography sx={{ whiteSpace: "pre-wrap" }}>{section.description}</Typography>

            {section.featuredPhotos.length > 0 && (
              <Stack spacing={2}>
                <Typography variant="h5" component="h3">
                  Galeria de Fotos
                </Typography>
                <GalleryCarousel
                  items={section.featuredPhotos.map((photo) => ({
                    id: photo.id,
                    type: photo.type,
                    url: photo.url,
                    thumbnailUrl: photo.thumbnailUrl,
                    caption: photo.caption,
                  }))}
                />
              </Stack>
            )}
          </Paper>
        ))}
      </PageContainer>
    </>
  );
}
