import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import EventIcon from "@mui/icons-material/Event";
import { PageContainer } from "@/components/PageContainer";
import { PageTitle } from "@/components/PageTitle";

export default function Loading() {
  return (
    <PageContainer maxWidth="md">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <PageTitle icon={<EventIcon />}>Eventos</PageTitle>
        <Stack direction="row" spacing={2}>
          <Skeleton variant="rounded" width={140} height={40} />
          <Skeleton variant="rounded" width={120} height={40} />
        </Stack>
      </Box>
      <Stack spacing={2}>
        {[0, 1, 2, 3].map((i) => (
          <Card key={i} variant="outlined">
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
              <Skeleton variant="rounded" width="5rem" height="5rem" sx={{ flexShrink: 0 }} />
              <CardContent sx={{ flex: 1, p: 0, "&:last-child": { pb: 0 } }}>
                <Skeleton variant="text" sx={{ fontSize: "1.25rem" }} width="60%" />
                <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                  <Skeleton variant="rounded" width={90} height={24} />
                  <Skeleton variant="text" width={120} />
                </Stack>
              </CardContent>
            </Box>
          </Card>
        ))}
      </Stack>
    </PageContainer>
  );
}
