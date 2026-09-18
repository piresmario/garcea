import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { executeGraphQL } from "@/lib/graphql-server";
import { HISTORIAL_SECTION_QUERY } from "@/lib/queries/historial";
import { PageContainer } from "@/components/PageContainer";
import { PageTitle } from "@/components/PageTitle";
import { FormCard } from "@/components/FormCard";
import { updateHistorialSectionAction } from "./actions";

type HistorialSectionData = { historialSection: { description: string } | null };

export default async function ManageHistorialPage() {
  const data = await executeGraphQL<HistorialSectionData>(HISTORIAL_SECTION_QUERY);

  return (
    <PageContainer maxWidth="md">
      <PageTitle icon={<AutoStoriesIcon />} color="secondary">
        Gerir Historial
      </PageTitle>

      <FormCard>
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
      </FormCard>
    </PageContainer>
  );
}
