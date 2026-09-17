import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { executeGraphQL } from "@/lib/graphql-server";
import { EVENTS_QUERY } from "@/lib/queries/events";
import { PageContainer } from "@/components/PageContainer";

type EventsData = {
  events: {
    id: string;
    title: string;
    date: string;
    location: string;
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
          Manage Events
        </Typography>
        <Button href="/manage/events/new" variant="contained">
          New Event
        </Button>
      </Box>
      {data.events.length === 0 ? (
        <Typography>No events yet.</Typography>
      ) : (
        <Stack spacing={2}>
          {data.events.map((event) => (
            <Box
              key={event.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                p: 2,
              }}
            >
              <Box>
                <Typography sx={{ fontWeight: 500 }}>{event.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(event.date).toLocaleDateString("pt-PT")} ·{" "}
                  {event.location}
                </Typography>
              </Box>
              <Stack direction="row" spacing={2}>
                <Button href={`/manage/events/${event.id}/edit`}>Edit</Button>
                <Button
                  href={`/manage/events/${event.id}/delete`}
                  color="error"
                >
                  Delete
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      )}
    </PageContainer>
  );
}
