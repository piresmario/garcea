import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import ShareIcon from "@mui/icons-material/Share";
import { executeGraphQL } from "@/lib/graphql-server";
import { SOCIAL_LINKS_QUERY } from "@/lib/queries/socialLinks";
import { PageContainer } from "@/components/PageContainer";
import { PageTitle } from "@/components/PageTitle";
import { SocialLinkForm } from "@/components/SocialLinkForm";
import { SubmitButton } from "@/components/SubmitButton";
import { SocialIcon, SOCIAL_PLATFORM_LABELS } from "@/components/SocialIcon";
import { createSocialLinkAction, deleteSocialLinkAction } from "./actions";

type SocialLinksData = {
  socialLinks: { id: string; platform: string; url: string }[];
};

export default async function ManageSocialLinksPage() {
  const data = await executeGraphQL<SocialLinksData>(SOCIAL_LINKS_QUERY);

  return (
    <PageContainer maxWidth="sm">
      <PageTitle icon={<ShareIcon />}>Gerir Redes Sociais</PageTitle>
      <Typography color="text.secondary">
        Estes links são mostrados no rodapé de todas as páginas.
      </Typography>

      <SocialLinkForm action={createSocialLinkAction} />

      {data.socialLinks.length === 0 ? (
        <Typography>Ainda não há links de redes sociais.</Typography>
      ) : (
        <Stack spacing={2}>
          {data.socialLinks.map((link) => {
            const deleteLink = deleteSocialLinkAction.bind(null, link.id);
            return (
              <Card
                key={link.id}
                variant="outlined"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 2,
                  p: 2,
                  transition: "box-shadow 0.2s ease",
                  "&:hover": { boxShadow: 3 },
                }}
              >
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                  <SocialIcon platform={link.platform} color="primary" />
                  <Stack>
                    <Typography variant="caption" color="text.secondary">
                      {SOCIAL_PLATFORM_LABELS[
                        link.platform as keyof typeof SOCIAL_PLATFORM_LABELS
                      ] ?? link.platform}
                    </Typography>
                    <Typography sx={{ fontWeight: 500, wordBreak: "break-all" }}>
                      {link.url}
                    </Typography>
                  </Stack>
                </Stack>
                <form action={deleteLink}>
                  <SubmitButton color="error">Eliminar</SubmitButton>
                </form>
              </Card>
            );
          })}
        </Stack>
      )}
    </PageContainer>
  );
}
