import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import { executeGraphQL } from "@/lib/graphql-server";
import { GALLERY_ITEMS_QUERY } from "@/lib/queries/gallery";
import { EVENT_OPTIONS_QUERY } from "@/lib/queries/events";
import { GalleryItemCard } from "@/components/GalleryItemCard";
import { GalleryFilters } from "@/components/GalleryFilters";
import { PageContainer } from "@/components/PageContainer";
import { PageTitle } from "@/components/PageTitle";
import { FlashMessage } from "@/components/FlashMessage";

type GalleryData = {
  galleryItems: {
    id: string;
    type: "PHOTO" | "VIDEO";
    url: string;
    thumbnailUrl: string | null;
    caption: string | null;
    event: { id: string; title: string } | null;
  }[];
};

type EventsData = { events: { id: string; title: string }[] };

export default async function ManageGalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; eventId?: string }>;
}) {
  const { success, eventId } = await searchParams;
  const [data, eventsData] = await Promise.all([
    executeGraphQL<GalleryData>(GALLERY_ITEMS_QUERY, { eventId: eventId || null }),
    executeGraphQL<EventsData>(EVENT_OPTIONS_QUERY),
  ]);
  // Rebuild as plain object literals: GraphQL execution results aren't
  // guaranteed to be plain objects (Next.js rejects non-plain-object/
  // null-prototype values passed as props into a Client Component).
  const events = eventsData.events.map((event) => ({
    id: event.id,
    title: event.title,
  }));

  return (
    <PageContainer maxWidth="md">
      <FlashMessage message={success} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <PageTitle icon={<PhotoLibraryIcon />}>Gerir Galeria</PageTitle>
        <Button href="/manage/gallery/new" variant="contained">
          Adicionar Item
        </Button>
      </Box>

      <GalleryFilters events={events} selectedEventId={eventId} />

      {data.galleryItems.length === 0 ? (
        <Typography>
          {eventId
            ? "Não há itens na galeria para este evento."
            : "Ainda não há itens na galeria."}
        </Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" },
            gap: 3,
          }}
        >
          {data.galleryItems.map((item) => (
            <Stack key={item.id} spacing={1}>
              <GalleryItemCard item={item} />
              <Typography variant="caption" color="text.secondary">
                {item.event?.title ?? "Sem evento"}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button href={`/manage/gallery/${item.id}/edit`} size="small">
                  Editar legenda
                </Button>
                <Button
                  href={`/manage/gallery/${item.id}/delete`}
                  size="small"
                  color="error"
                >
                  Eliminar
                </Button>
              </Stack>
            </Stack>
          ))}
        </Box>
      )}
    </PageContainer>
  );
}
