import { prisma } from "@/lib/prisma";
import { requireUserId, type GraphQLContext } from "./context";

type EventInput = {
  title: string;
  description: string;
  date: string;
  location: string;
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

type ContactMessageInput = {
  name: string;
  email: string;
  message: string;
};

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
    contactMessages: (_: unknown, __: unknown, context: GraphQLContext) => {
      requireUserId(context);
      return prisma.contactMessage.findMany({ orderBy: { submittedAt: "desc" } });
    },
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
    updateEvent: (
      _: unknown,
      args: { id: string; input: EventInput },
      context: GraphQLContext,
    ) => {
      requireUserId(context);
      return prisma.event.update({
        where: { id: args.id },
        data: { ...args.input, date: new Date(args.input.date) },
      });
    },
    deleteEvent: async (
      _: unknown,
      args: { id: string },
      context: GraphQLContext,
    ) => {
      requireUserId(context);
      await prisma.event.delete({ where: { id: args.id } });
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
      await prisma.galleryItem.delete({ where: { id: args.id } });
      return true;
    },

    submitContactMessage: (_: unknown, args: { input: ContactMessageInput }) =>
      prisma.contactMessage.create({ data: args.input }),
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
  },

  ContactMessage: {
    submittedAt: (parent: { submittedAt: Date }) => toISOString(parent.submittedAt),
  },
};
