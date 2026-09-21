import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import { PageContainer } from "@/components/PageContainer";

export default function Loading() {
  return (
    <PageContainer maxWidth="md">
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
        <Skeleton variant="circular" width={44} height={44} />
        <Skeleton variant="text" sx={{ fontSize: "2.125rem" }} width="55%" />
      </Stack>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Skeleton variant="rounded" width={90} height={24} />
        <Skeleton variant="rounded" width={80} height={24} />
        <Skeleton variant="text" width={140} />
      </Stack>
      <Skeleton variant="rounded" sx={{ maxWidth: "25rem", width: "100%", aspectRatio: "4 / 3" }} />
      <Stack spacing={1}>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="70%" />
      </Stack>
    </PageContainer>
  );
}
