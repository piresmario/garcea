import type { NextRequest } from "next/server";
import { createYoga } from "graphql-yoga";
import { schema } from "@/graphql/schema";
import { createContext } from "@/graphql/context";

const { handleRequest } = createYoga({
  schema,
  context: createContext,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Response },
});

export function GET(request: NextRequest) {
  return handleRequest(request, {});
}

export function POST(request: NextRequest) {
  return handleRequest(request, {});
}
