import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { executeGraphQL } from "@/lib/graphql-server";
import { EVENTS_QUERY } from "@/lib/queries/events";
import { PageContainer } from "@/components/PageContainer";
import { isPdfUrl } from "@/lib/supabase-storage";

type EventsData = {
  events: {
    id: string;
    title: string;
    date: string;
    location: string;
    posterUrl: string | null;
  }[];
};

export default async function ManageEventsPage() {
  const data = await executeGraphQL<EventsData>(EVENTS_QUERY);

  return (
    <PageContainer maxWidth="md">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" component="h1">
          Gerir Eventos
        </Typography>
        <Button href="/manage/events/new" variant="contained">
          Novo Evento
        </Button>
      </Box>
      {data.events.length === 0 ? (
        <Typography>Ainda não há eventos.</Typography>
      ) : (
        <Stack spacing={2}>
          {data.events.map((event) => (
            <Card
              key={event.id}
              variant="outlined"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
                transition: "box-shadow 0.2s ease",
                "&:hover": { boxShadow: 3 },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {event.posterUrl && !isPdfUrl(event.posterUrl) && (
                  <Box
                    component="img"
                    src={event.posterUrl}
                    alt=""
                    sx={{ width: 48, height: 48, objectFit: "cover", borderRadius: 1 }}
                  />
                )}
                <Box>
                  <Typography sx={{ fontWeight: 500 }}>{event.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(event.date).toLocaleDateString("pt-PT")} ·{" "}
                    {event.location}
                  </Typography>
                </Box>
              </Box>
              <Stack direction="row" spacing={2}>
                <Button href={`/manage/events/${event.id}/edit`}>Editar</Button>
                <Button
                  href={`/manage/events/${event.id}/delete`}
                  color="error"
                >
                  Eliminar
                </Button>
              </Stack>
            </Card>
          ))}
        </Stack>
      )}
    </PageContainer>
  );
}
