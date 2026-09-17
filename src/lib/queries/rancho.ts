export const RANCHO_SECTION_QUERY = /* GraphQL */ `
  query RanchoSection {
    ranchoSection {
      description
      updatedAt
    }
  }
`;

export const RANCHO_PHOTOS_QUERY = /* GraphQL */ `
  query RanchoPhotos {
    ranchoPhotos {
      id
      type
      url
      thumbnailUrl
      caption
    }
  }
`;

export const GALLERY_ITEMS_FOR_PICKER_QUERY = /* GraphQL */ `
  query GalleryItemsForPicker {
    galleryItems {
      id
      type
      url
      thumbnailUrl
      caption
      isFeaturedInRancho
    }
  }
`;

export const UPDATE_RANCHO_SECTION_MUTATION = /* GraphQL */ `
  mutation UpdateRanchoSection($description: String!) {
    updateRanchoSection(description: $description) {
      description
    }
  }
`;

export const FEATURE_RANCHO_PHOTO_MUTATION = /* GraphQL */ `
  mutation FeatureRanchoPhoto($galleryItemId: ID!) {
    featureRanchoPhoto(galleryItemId: $galleryItemId) {
      id
    }
  }
`;

export const UNFEATURE_RANCHO_PHOTO_MUTATION = /* GraphQL */ `
  mutation UnfeatureRanchoPhoto($galleryItemId: ID!) {
    unfeatureRanchoPhoto(galleryItemId: $galleryItemId)
  }
`;
