import Typography from "@mui/material/Typography";
import { PageContainer } from "@/components/PageContainer";

export default function Home() {
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
    </PageContainer>
  );
}
