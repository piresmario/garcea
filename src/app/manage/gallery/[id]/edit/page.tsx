import { notFound } from "next/navigation";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { executeGraphQL } from "@/lib/graphql-server";
import { GALLERY_ITEM_QUERY } from "@/lib/queries/gallery";
import { PageContainer } from "@/components/PageContainer";
import { updateGalleryItemAction } from "../../actions";

type GalleryItemData = { galleryItem: { caption: string | null } | null };

export default async function EditGalleryItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await executeGraphQL<GalleryItemData>(GALLERY_ITEM_QUERY, { id });

  if (!data.galleryItem) notFound();

  const updateWithId = updateGalleryItemAction.bind(null, id);

  return (
    <PageContainer maxWidth="sm">
      <Typography variant="h4" component="h1">
        Edit Caption
      </Typography>
      <Stack component="form" action={updateWithId} spacing={2}>
        <TextField
          label="Caption"
          name="caption"
          defaultValue={data.galleryItem.caption ?? ""}
        />
        <Button type="submit" variant="contained" sx={{ alignSelf: "flex-start" }}>
          Save
        </Button>
      </Stack>
    </PageContainer>
  );
}
