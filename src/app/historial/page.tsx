import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { PageContainer } from "@/components/PageContainer";
import { executeGraphQL } from "@/lib/graphql-server";
import { HISTORIAL_SECTION_QUERY } from "@/lib/queries/historial";

type HistorialSectionData = { historialSection: { description: string } | null };

export default async function HistorialPage() {
  const data = await executeGraphQL<HistorialSectionData>(HISTORIAL_SECTION_QUERY);

  return (
    <PageContainer maxWidth="md">
      <Stack component="section" spacing={2}>
        <Typography variant="h4" component="h1">
          Historial
        </Typography>
        {data.historialSection ? (
          <Typography sx={{ whiteSpace: "pre-wrap" }}>
            {data.historialSection.description}
          </Typography>
        ) : (
          <Typography color="text.secondary">Sem conteúdo por enquanto.</Typography>
        )}
      </Stack>
    </PageContainer>
  );
}
