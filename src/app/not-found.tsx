import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { PageContainer } from "@/components/PageContainer";

export default function NotFound() {
  return (
    <PageContainer maxWidth="sm">
      <Typography variant="h4" component="h1">
        Página não encontrada
      </Typography>
      <Typography color="text.secondary">
        A página que procura não existe ou foi movida.
      </Typography>
      <Button href="/" variant="contained" sx={{ alignSelf: "flex-start" }}>
        Voltar ao Início
      </Button>
    </PageContainer>
  );
}
