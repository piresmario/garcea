import { notFound } from "next/navigation";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { executeGraphQL } from "@/lib/graphql-server";
import { SOCIAL_LINKS_QUERY } from "@/lib/queries/socialLinks";
import { PageContainer } from "@/components/PageContainer";
import { SubmitButton } from "@/components/SubmitButton";
import { SOCIAL_PLATFORM_LABELS } from "@/components/SocialIcon";
import { deleteSocialLinkAction } from "../../actions";

type SocialLinksData = {
  socialLinks: { id: string; platform: string; url: string }[];
};

export default async function DeleteSocialLinkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await executeGraphQL<SocialLinksData>(SOCIAL_LINKS_QUERY);
  const link = data.socialLinks.find((item) => item.id === id);

  if (!link) notFound();

  const deleteWithId = deleteSocialLinkAction.bind(null, id);
  const platformLabel =
    SOCIAL_PLATFORM_LABELS[link.platform as keyof typeof SOCIAL_PLATFORM_LABELS] ??
    link.platform;

  return (
    <PageContainer maxWidth="sm">
      <Typography variant="h4" component="h1">
        Eliminar Link de Rede Social
      </Typography>
      <Typography>
        Tem a certeza que deseja eliminar o link de {platformLabel} (
        {link.url})? Esta ação não pode ser desfeita.
      </Typography>
      <Stack component="form" action={deleteWithId} direction="row" spacing={2}>
        <SubmitButton variant="contained" color="error">
          Eliminar
        </SubmitButton>
        <Button href="/manage/social-links" variant="outlined">
          Cancelar
        </Button>
      </Stack>
    </PageContainer>
  );
}
