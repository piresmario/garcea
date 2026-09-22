import { notFound } from "next/navigation";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { executeGraphQL } from "@/lib/graphql-server";
import { HOME_SECTION_QUERY } from "@/lib/queries/homeSections";
import { PageContainer } from "@/components/PageContainer";
import { SubmitButton } from "@/components/SubmitButton";
import { deleteHomeSectionAction } from "../../actions";

type HomeSectionData = { homeSection: { title: string } | null };

export default async function DeleteHomeSectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await executeGraphQL<HomeSectionData>(HOME_SECTION_QUERY, { id });

  if (!data.homeSection) notFound();

  const deleteWithId = deleteHomeSectionAction.bind(null, id);

  return (
    <PageContainer maxWidth="sm">
      <Typography variant="h4" component="h1">
        Eliminar Secção
      </Typography>
      <Typography>
        Tem a certeza que deseja eliminar &ldquo;{data.homeSection.title}
        &rdquo;? Esta ação não pode ser desfeita.
      </Typography>
      <Stack component="form" action={deleteWithId} direction="row" spacing={2}>
        <SubmitButton variant="contained" color="error">
          Eliminar
        </SubmitButton>
        <Button href="/manage/home-sections" variant="outlined">
          Cancelar
        </Button>
      </Stack>
    </PageContainer>
  );
}
