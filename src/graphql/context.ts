import { GraphQLError } from "graphql";
import type { Session } from "next-auth";
import { auth } from "@/auth";

export type GraphQLContext = {
  session: Session | null;
};

export async function createContext(): Promise<GraphQLContext> {
  const session = await auth();
  return { session };
}

export function requireUserId(context: GraphQLContext): string {
  const userId = context.session?.user?.id;
  if (!userId) {
    throw new GraphQLError("Not authenticated", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }
  return userId;
}
