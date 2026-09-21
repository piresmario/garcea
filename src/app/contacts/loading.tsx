import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import EmailIcon from "@mui/icons-material/Email";
import { PageContainer } from "@/components/PageContainer";
import { PageTitle } from "@/components/PageTitle";

export default function Loading() {
  return (
    <PageContainer maxWidth="sm">
      <PageTitle icon={<EmailIcon />} color="secondary">
        Contactos
      </PageTitle>
      <Typography color="text.secondary">
        Gostaria de ver o Rancho Folclórico das Lavradeiras de Gondar no seu evento? Pode contactar-nos
      </Typography>

      <Paper
        variant="outlined"
        sx={{ p: { xs: 3, sm: 4 }, borderTop: 3, borderTopColor: "secondary.main" }}
      >
        <Stack spacing={1.5}>
          {[0, 1, 2].map((i) => (
            <Stack key={i} direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
              <Skeleton variant="circular" width={20} height={20} />
              <Skeleton variant="text" width={180} />
            </Stack>
          ))}
        </Stack>
      </Paper>
    </PageContainer>
  );
}
