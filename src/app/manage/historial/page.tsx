import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { executeGraphQL } from "@/lib/graphql-server";
import { HISTORIAL_SECTION_QUERY } from "@/lib/queries/historial";
import { PageContainer } from "@/components/PageContainer";
import { updateHistorialSectionAction } from "./actions";

type HistorialSectionData = { historialSection: { description: string } | null };

export default async function ManageHistorialPage() {
  const data = await executeGraphQL<HistorialSectionData>(HISTORIAL_SECTION_QUERY);

  return (
    <PageContainer maxWidth="md">
      <Typography variant="h4" component="h1">
        Gerir Historial
      </Typography>

      <Stack component="form" action={updateHistorialSectionAction} spacing={2}>
        <TextField
          label="Descrição"
          name="description"
          required
          multiline
          rows={10}
          defaultValue={data.historialSection?.description ?? ""}
        />
        <Button type="submit" variant="contained" sx={{ alignSelf: "flex-start" }}>
          Guardar
        </Button>
      </Stack>
    </PageContainer>
  );
}
