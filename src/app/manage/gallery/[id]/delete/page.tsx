import { notFound } from "next/navigation";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { executeGraphQL } from "@/lib/graphql-server";
import { GALLERY_ITEM_QUERY } from "@/lib/queries/gallery";
import { PageContainer } from "@/components/PageContainer";
import { deleteGalleryItemAction } from "../../actions";

type GalleryItemData = { galleryItem: { id: string } | null };

export default async function DeleteGalleryItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await executeGraphQL<GalleryItemData>(GALLERY_ITEM_QUERY, { id });

  if (!data.galleryItem) notFound();

  const deleteWithId = deleteGalleryItemAction.bind(null, id);

  return (
    <PageContainer maxWidth="sm">
      <Typography variant="h4" component="h1">
        Eliminar Item da Galeria
      </Typography>
      <Typography>
        Tem a certeza que deseja eliminar este item? Esta ação não pode ser
        desfeita.
      </Typography>
      <Stack component="form" action={deleteWithId} direction="row" spacing={2}>
        <Button type="submit" variant="contained" color="error">
          Eliminar
        </Button>
        <Button href="/manage/gallery" variant="outlined">
          Cancelar
        </Button>
      </Stack>
    </PageContainer>
  );
}
