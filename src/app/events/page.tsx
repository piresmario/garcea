import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
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

export default async function EventsPage() {
  const data = await executeGraphQL<EventsData>(EVENTS_QUERY);

  return (
    <PageContainer maxWidth="md">
      <Typography variant="h4" component="h1">
        Eventos
      </Typography>
      {data.events.length === 0 ? (
        <Typography>Ainda não há eventos.</Typography>
      ) : (
        <Stack spacing={2}>
          {data.events.map((event) => (
            <Card
              key={event.id}
              variant="outlined"
              sx={{
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": { transform: "translateY(-2px)", boxShadow: 3 },
              }}
            >
              <CardActionArea
                href={`/events/${event.id}`}
                sx={{ display: "flex", justifyContent: "flex-start" }}
              >
                {event.posterUrl && !isPdfUrl(event.posterUrl) && (
                  <CardMedia
                    component="img"
                    image={event.posterUrl}
                    alt=""
                    sx={{ width: 80, height: 80, objectFit: "cover", flexShrink: 0 }}
                  />
                )}
                <CardContent>
                  <Typography variant="h6">{event.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(event.date).toLocaleDateString("pt-PT")} ·{" "}
                    {event.location}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      )}
    </PageContainer>
  );
}
