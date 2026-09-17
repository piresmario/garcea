import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { executeGraphQL } from "@/lib/graphql-server";
import { RANCHO_SECTION_QUERY, RANCHO_PHOTOS_QUERY } from "@/lib/queries/rancho";
import { PageContainer } from "@/components/PageContainer";
import { GalleryItemCard } from "@/components/GalleryItemCard";
import { updateRanchoSectionAction, unfeatureRanchoPhotoAction } from "./actions";

type RanchoSectionData = { ranchoSection: { description: string } | null };
type RanchoPhotosData = {
  ranchoPhotos: {
    id: string;
    type: "PHOTO" | "VIDEO";
    url: string;
    thumbnailUrl: string | null;
    caption: string | null;
  }[];
};

export default async function ManageRanchoPage() {
  const [sectionData, photosData] = await Promise.all([
    executeGraphQL<RanchoSectionData>(RANCHO_SECTION_QUERY),
    executeGraphQL<RanchoPhotosData>(RANCHO_PHOTOS_QUERY),
  ]);

  return (
    <PageContainer maxWidth="md">
      <Typography variant="h4" component="h1">
        Manage Rancho Section
      </Typography>

      <Stack component="form" action={updateRanchoSectionAction} spacing={2}>
        <TextField
          label="Description"
          name="description"
          required
          multiline
          rows={6}
          defaultValue={sectionData.ranchoSection?.description ?? ""}
        />
        <Button type="submit" variant="contained" sx={{ alignSelf: "flex-start" }}>
          Save
        </Button>
      </Stack>

      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        <Typography variant="h5" component="h2">
          Featured Photos
        </Typography>
        <Button href="/manage/rancho/add-photo" variant="contained">
          Add Photo
        </Button>
      </Box>

      {photosData.ranchoPhotos.length === 0 ? (
        <Typography>No photos featured yet.</Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" },
            gap: 3,
          }}
        >
          {photosData.ranchoPhotos.map((photo) => {
            const unfeature = unfeatureRanchoPhotoAction.bind(null, photo.id);
            return (
              <Stack key={photo.id} spacing={1}>
                <GalleryItemCard item={photo} />
                <form action={unfeature}>
                  <Button type="submit" size="small" color="error">
                    Remove from Home page
                  </Button>
                </form>
              </Stack>
            );
          })}
        </Box>
      )}
    </PageContainer>
  );
}
