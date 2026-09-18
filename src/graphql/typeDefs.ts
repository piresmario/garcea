export const typeDefs = /* GraphQL */ `
  enum GalleryItemType {
    PHOTO
    VIDEO
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

  type ContactMessage {
    id: ID!
    name: String!
    email: String!
    message: String!
    submittedAt: String!
  }

  type RanchoSection {
    description: String!
    updatedAt: String!
  }

  type HistorialSection {
    description: String!
    updatedAt: String!
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

  input ContactMessageInput {
    name: String!
    email: String!
    message: String!
  }

  type Query {
    events: [Event!]!
    event(id: ID!): Event
    galleryItems(eventId: ID): [GalleryItem!]!
    galleryItem(id: ID!): GalleryItem
    contactMessages: [ContactMessage!]!
    ranchoSection: RanchoSection
    ranchoPhotos: [GalleryItem!]!
    historialSection: HistorialSection
  }

  type Mutation {
    createEvent(input: EventInput!): Event!
    updateEvent(id: ID!, input: EventInput!): Event!
    deleteEvent(id: ID!): Boolean!

    createGalleryItem(input: GalleryItemInput!): GalleryItem!
    updateGalleryItem(id: ID!, input: GalleryItemUpdateInput!): GalleryItem!
    deleteGalleryItem(id: ID!): Boolean!

    submitContactMessage(input: ContactMessageInput!): ContactMessage!

    updateRanchoSection(description: String!): RanchoSection!
    featureRanchoPhoto(galleryItemId: ID!): GalleryItem!
    unfeatureRanchoPhoto(galleryItemId: ID!): Boolean!

    updateHistorialSection(description: String!): HistorialSection!
  }
`;
