import { prisma } from "@/lib/prisma";
import { deletePhoto } from "@/lib/supabase-storage";
import { requireUserId, type GraphQLContext } from "./context";

type EventInput = {
  title: string;
  description: string;
  date: string;
  location: string;
  posterUrl?: string | null;
};

type GalleryItemInput = {
  type: "PHOTO" | "VIDEO";
  url: string;
  thumbnailUrl?: string | null;
  caption?: string | null;
  eventId?: string | null;
};

type GalleryItemUpdateInput = {
  caption?: string | null;
  thumbnailUrl?: string | null;
};

type OfficialContactInput = {
  type: "EMAIL" | "PHONE";
  value: string;
};

type SocialLinkInput = {
  platform: "FACEBOOK" | "INSTAGRAM" | "YOUTUBE" | "TWITTER" | "WHATSAPP" | "OTHER";
  url: string;
};

const RANCHO_SECTION_ID = "rancho";
const HISTORIAL_SECTION_ID = "historial";

function toISOString(value: Date): string {
  return value.toISOString();
}

export const resolvers = {
  Query: {
    events: () => prisma.event.findMany({ orderBy: { date: "desc" } }),
    event: (_: unknown, args: { id: string }) =>
      prisma.event.findUnique({ where: { id: args.id } }),
    galleryItems: (_: unknown, args: { eventId?: string | null }) =>
      prisma.galleryItem.findMany({
        where: args.eventId ? { eventId: args.eventId } : undefined,
        orderBy: { createdAt: "desc" },
      }),
    galleryItem: (_: unknown, args: { id: string }) =>
      prisma.galleryItem.findUnique({ where: { id: args.id } }),
    ranchoSection: () =>
      prisma.ranchoSection.findUnique({ where: { id: RANCHO_SECTION_ID } }),
    ranchoPhotos: async () => {
      const featured = await prisma.ranchoFeaturedPhoto.findMany({
        orderBy: { createdAt: "asc" },
        include: { galleryItem: true },
      });
      return featured.map((f) => f.galleryItem);
    },
    historialSection: () =>
      prisma.historialSection.findUnique({ where: { id: HISTORIAL_SECTION_ID } }),
    officialContacts: () =>
      prisma.officialContact.findMany({ orderBy: { createdAt: "asc" } }),
    socialLinks: () => prisma.socialLink.findMany({ orderBy: { createdAt: "asc" } }),
  },

  Mutation: {
    createEvent: (
      _: unknown,
      args: { input: EventInput },
      context: GraphQLContext,
    ) => {
      const userId = requireUserId(context);
      return prisma.event.create({
        data: {
          ...args.input,
          date: new Date(args.input.date),
          createdById: userId,
        },
      });
    },
    updateEvent: async (
      _: unknown,
      args: { id: string; input: EventInput },
      context: GraphQLContext,
    ) => {
      requireUserId(context);
      const previous = await prisma.event.findUnique({ where: { id: args.id } });
      const updated = await prisma.event.update({
        where: { id: args.id },
        data: { ...args.input, date: new Date(args.input.date) },
      });
      // "posterUrl" in args.input distinguishes "left unchanged" (key omitted)
      // from "cleared" (explicit null) or "replaced" (a new URL).
      if (
        previous?.posterUrl &&
        "posterUrl" in args.input &&
        args.input.posterUrl !== previous.posterUrl
      ) {
        await deletePhoto(previous.posterUrl).catch((error) => {
          console.error("Failed to delete old event poster from storage:", error);
        });
      }
      return updated;
    },
    deleteEvent: async (
      _: unknown,
      args: { id: string },
      context: GraphQLContext,
    ) => {
      requireUserId(context);
      const event = await prisma.event.delete({ where: { id: args.id } });
      if (event.posterUrl) {
        await deletePhoto(event.posterUrl).catch((error) => {
          console.error("Failed to delete event poster from storage:", error);
        });
      }
      return true;
    },

    createGalleryItem: (
      _: unknown,
      args: { input: GalleryItemInput },
      context: GraphQLContext,
    ) => {
      const userId = requireUserId(context);
      return prisma.galleryItem.create({
        data: { ...args.input, uploadedById: userId },
      });
    },
    updateGalleryItem: (
      _: unknown,
      args: { id: string; input: GalleryItemUpdateInput },
      context: GraphQLContext,
    ) => {
      requireUserId(context);
      return prisma.galleryItem.update({
        where: { id: args.id },
        data: args.input,
      });
    },
    deleteGalleryItem: async (
      _: unknown,
      args: { id: string },
      context: GraphQLContext,
    ) => {
      requireUserId(context);
      const item = await prisma.galleryItem.delete({ where: { id: args.id } });
      if (item.type === "PHOTO") {
        await deletePhoto(item.url).catch((error) => {
          console.error("Failed to delete photo from storage:", error);
        });
      }
      return true;
    },

    updateRanchoSection: (
      _: unknown,
      args: { description: string },
      context: GraphQLContext,
    ) => {
      requireUserId(context);
      return prisma.ranchoSection.upsert({
        where: { id: RANCHO_SECTION_ID },
        update: { description: args.description },
        create: { id: RANCHO_SECTION_ID, description: args.description },
      });
    },
    featureRanchoPhoto: (
      _: unknown,
      args: { galleryItemId: string },
      context: GraphQLContext,
    ) => {
      requireUserId(context);
      return prisma.ranchoFeaturedPhoto
        .create({
          data: { galleryItemId: args.galleryItemId },
          include: { galleryItem: true },
        })
        .then((f) => f.galleryItem);
    },
    unfeatureRanchoPhoto: async (
      _: unknown,
      args: { galleryItemId: string },
      context: GraphQLContext,
    ) => {
      requireUserId(context);
      await prisma.ranchoFeaturedPhoto.delete({
        where: { galleryItemId: args.galleryItemId },
      });
      return true;
    },

    updateHistorialSection: (
      _: unknown,
      args: { description: string },
      context: GraphQLContext,
    ) => {
      requireUserId(context);
      return prisma.historialSection.upsert({
        where: { id: HISTORIAL_SECTION_ID },
        update: { description: args.description },
        create: { id: HISTORIAL_SECTION_ID, description: args.description },
      });
    },

    createOfficialContact: (
      _: unknown,
      args: { input: OfficialContactInput },
      context: GraphQLContext,
    ) => {
      requireUserId(context);
      return prisma.officialContact.create({ data: args.input });
    },
    deleteOfficialContact: async (
      _: unknown,
      args: { id: string },
      context: GraphQLContext,
    ) => {
      requireUserId(context);
      await prisma.officialContact.delete({ where: { id: args.id } });
      return true;
    },

    createSocialLink: (
      _: unknown,
      args: { input: SocialLinkInput },
      context: GraphQLContext,
    ) => {
      requireUserId(context);
      return prisma.socialLink.create({ data: args.input });
    },
    deleteSocialLink: async (
      _: unknown,
      args: { id: string },
      context: GraphQLContext,
    ) => {
      requireUserId(context);
      await prisma.socialLink.delete({ where: { id: args.id } });
      return true;
    },
  },

  Event: {
    date: (parent: { date: Date }) => toISOString(parent.date),
    createdAt: (parent: { createdAt: Date }) => toISOString(parent.createdAt),
    createdBy: (parent: { createdById: string }) =>
      prisma.user.findUniqueOrThrow({ where: { id: parent.createdById } }),
    galleryItems: (parent: { id: string }) =>
      prisma.galleryItem.findMany({
        where: { eventId: parent.id },
        orderBy: { createdAt: "desc" },
      }),
  },

  GalleryItem: {
    createdAt: (parent: { createdAt: Date }) => toISOString(parent.createdAt),
    event: (parent: { eventId: string | null }) =>
      parent.eventId ? prisma.event.findUnique({ where: { id: parent.eventId } }) : null,
    uploadedBy: (parent: { uploadedById: string }) =>
      prisma.user.findUniqueOrThrow({ where: { id: parent.uploadedById } }),
    isFeaturedInRancho: async (parent: { id: string }) => {
      const featured = await prisma.ranchoFeaturedPhoto.findUnique({
        where: { galleryItemId: parent.id },
      });
      return featured !== null;
    },
  },

  RanchoSection: {
    updatedAt: (parent: { updatedAt: Date }) => toISOString(parent.updatedAt),
  },

  HistorialSection: {
    updatedAt: (parent: { updatedAt: Date }) => toISOString(parent.updatedAt),
  },

  OfficialContact: {
    createdAt: (parent: { createdAt: Date }) => toISOString(parent.createdAt),
  },

  SocialLink: {
    createdAt: (parent: { createdAt: Date }) => toISOString(parent.createdAt),
  },
};
