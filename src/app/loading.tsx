import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { PageContainer } from "@/components/PageContainer";

export default function Loading() {
  return (
    <PageContainer maxWidth="md">
      <Paper
        component="section"
        variant="outlined"
        sx={{ p: { xs: 3, sm: 5 }, display: "flex", flexDirection: "column", gap: 3 }}
      >
        <Skeleton variant="text" sx={{ fontSize: "2.125rem" }} width="45%" />
        <Stack spacing={1}>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" width="70%" />
        </Stack>
        <Skeleton variant="rounded" sx={{ height: { xs: "17.5rem", sm: "20rem", md: "22.5rem" } }} />
      </Paper>
    </PageContainer>
  );
}
