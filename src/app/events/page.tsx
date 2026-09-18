import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import EventIcon from "@mui/icons-material/Event";
import { executeGraphQL } from "@/lib/graphql-server";
import { EVENTS_QUERY } from "@/lib/queries/events";
import { PageContainer } from "@/components/PageContainer";
import { PageTitle } from "@/components/PageTitle";
import { EventYearFilter } from "@/components/EventYearFilter";
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

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>;
}) {
  const { year } = await searchParams;
  const data = await executeGraphQL<EventsData>(EVENTS_QUERY);

  const currentYear = new Date().getFullYear();
  const eventYears = data.events.map((event) => new Date(event.date).getFullYear());
  const availableYears = Array.from(new Set([...eventYears, currentYear])).sort(
    (a, b) => b - a,
  );

  const requestedYear = year ? Number(year) : undefined;
  const selectedYear =
    requestedYear !== undefined && availableYears.includes(requestedYear)
      ? requestedYear
      : currentYear;

  const events = data.events.filter(
    (event) => new Date(event.date).getFullYear() === selectedYear,
  );

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
        <EventYearFilter years={availableYears} selectedYear={selectedYear} />
      </Box>
      {events.length === 0 ? (
        <Typography>Não há eventos em {selectedYear}.</Typography>
      ) : (
        <Stack spacing={2}>
          {events.map((event) => (
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
                  <Stack direction="row" spacing={1} sx={{ alignItems: "center", mt: 0.5 }}>
                    <Chip
                      size="small"
                      color="secondary"
                      label={new Date(event.date).toLocaleDateString("pt-PT")}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {event.location}
                    </Typography>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      )}
    </PageContainer>
  );
}
