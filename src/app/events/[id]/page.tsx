import { notFound } from "next/navigation";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { executeGraphQL } from "@/lib/graphql-server";
import { EVENT_QUERY } from "@/lib/queries/events";
import { GalleryItemCard } from "@/components/GalleryItemCard";
import { PageContainer } from "@/components/PageContainer";
import { isPdfUrl } from "@/lib/supabase-storage";

type EventData = {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    posterUrl: string | null;
    createdBy: { name: string };
    galleryItems: {
      id: string;
      type: "PHOTO" | "VIDEO";
      url: string;
      thumbnailUrl: string | null;
      caption: string | null;
    }[];
  } | null;
};

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await executeGraphQL<EventData>(EVENT_QUERY, { id });

  if (!data.event) notFound();

  const event = data.event;

  return (
    <PageContainer maxWidth="md">
      <Typography variant="h4" component="h1">
        {event.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {new Date(event.date).toLocaleDateString("pt-PT")} · {event.location}
      </Typography>
      {event.posterUrl &&
        (isPdfUrl(event.posterUrl) ? (
          <Button
            href={event.posterUrl}
            target="_blank"
            rel="noreferrer"
            variant="outlined"
            sx={{ alignSelf: "flex-start" }}
          >
            Ver cartaz (PDF)
          </Button>
        ) : (
          <Box
            component="img"
            src={event.posterUrl}
            alt={`Cartaz: ${event.title}`}
            sx={{ maxWidth: 400, width: "100%", borderRadius: 1 }}
          />
        ))}
      <Typography>{event.description}</Typography>

      {event.galleryItems.length > 0 && (
        <Stack spacing={2}>
          <Typography variant="h5" component="h2">
            Galeria
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" },
              gap: 2,
            }}
          >
            {event.galleryItems.map((item) => (
              <GalleryItemCard key={item.id} item={item} />
            ))}
          </Box>
        </Stack>
      )}
    </PageContainer>
  );
}
