export const typeDefs = /* GraphQL */ `
  enum GalleryItemType {
    PHOTO
    VIDEO
  }

  enum OfficialContactType {
    EMAIL
    PHONE
  }

  enum SocialPlatform {
    FACEBOOK
    INSTAGRAM
    YOUTUBE
    TWITTER
    WHATSAPP
    OTHER
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Event {
    id: ID!
    title: String!
    description: String!
    date: String!
    location: String!
    posterUrl: String
    createdAt: String!
    createdBy: User!
    galleryItems: [GalleryItem!]!
  }

  type GalleryItem {
    id: ID!
    type: GalleryItemType!
    url: String!
    thumbnailUrl: String
    caption: String
    createdAt: String!
    event: Event
    uploadedBy: User!
    isFeaturedInRancho: Boolean!
  }

  type RanchoSection {
    description: String!
    updatedAt: String!
  }

  type HistorialSection {
    description: String!
    updatedAt: String!
  }

  type OfficialContact {
    id: ID!
    type: OfficialContactType!
    value: String!
    createdAt: String!
  }

  type SocialLink {
    id: ID!
    platform: SocialPlatform!
    url: String!
    createdAt: String!
  }

  input EventInput {
    title: String!
    description: String!
    date: String!
    location: String!
    posterUrl: String
  }

  input GalleryItemInput {
    type: GalleryItemType!
    url: String!
    thumbnailUrl: String
    caption: String
    eventId: ID
  }

  input GalleryItemUpdateInput {
    caption: String
    thumbnailUrl: String
  }

  input OfficialContactInput {
    type: OfficialContactType!
    value: String!
  }

  input SocialLinkInput {
    platform: SocialPlatform!
    url: String!
  }

  type Query {
    events: [Event!]!
    event(id: ID!): Event
    galleryItems(eventId: ID): [GalleryItem!]!
    galleryItem(id: ID!): GalleryItem
    ranchoSection: RanchoSection
    ranchoPhotos: [GalleryItem!]!
    historialSection: HistorialSection
    officialContacts: [OfficialContact!]!
    socialLinks: [SocialLink!]!
  }

  type Mutation {
    createEvent(input: EventInput!): Event!
    updateEvent(id: ID!, input: EventInput!): Event!
    deleteEvent(id: ID!): Boolean!

    createGalleryItem(input: GalleryItemInput!): GalleryItem!
    updateGalleryItem(id: ID!, input: GalleryItemUpdateInput!): GalleryItem!
    deleteGalleryItem(id: ID!): Boolean!

    updateRanchoSection(description: String!): RanchoSection!
    featureRanchoPhoto(galleryItemId: ID!): GalleryItem!
    unfeatureRanchoPhoto(galleryItemId: ID!): Boolean!

    updateHistorialSection(description: String!): HistorialSection!

    createOfficialContact(input: OfficialContactInput!): OfficialContact!
    deleteOfficialContact(id: ID!): Boolean!

    createSocialLink(input: SocialLinkInput!): SocialLink!
    deleteSocialLink(id: ID!): Boolean!
  }
`;
