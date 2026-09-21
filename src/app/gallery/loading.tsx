import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import { PageContainer } from "@/components/PageContainer";
import { PageTitle } from "@/components/PageTitle";

export default function Loading() {
  return (
    <PageContainer maxWidth="md">
      <PageTitle icon={<PhotoLibraryIcon />}>Galeria</PageTitle>
      <Stack spacing={2}>
        <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} width={160} />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" },
            gap: 2,
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} variant="rounded" sx={{ aspectRatio: "1 / 1", width: "100%" }} />
          ))}
        </Box>
      </Stack>
    </PageContainer>
  );
}
