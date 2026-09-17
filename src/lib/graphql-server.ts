import { graphql } from "graphql";
import { redirect } from "next/navigation";
import { schema } from "@/graphql/schema";
import { createContext } from "@/graphql/context";

export class GraphQLRequestError extends Error {
  code?: string;

  constructor(message: string, code?: string) {
    super(message);
    this.code = code;
  }
}

export async function executeGraphQL<T>(
  source: string,
  variableValues?: Record<string, unknown>,
): Promise<T> {
  const contextValue = await createContext();
  const result = await graphql({ schema, source, variableValues, contextValue });

  if (result.errors?.length) {
    const [firstError] = result.errors;
    throw new GraphQLRequestError(
      result.errors.map((error) => error.message).join("; "),
      firstError.extensions?.code as string | undefined,
    );
  }

  return result.data as T;
}

/**
 * Runs a gated mutation and redirects to /login if the session expired
 * between page load and form submit (proxy.ts already gates the page load
 * itself, so this only covers that narrow race).
 */
export async function runGatedMutation<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof GraphQLRequestError && error.code === "UNAUTHENTICATED") {
      redirect("/login");
    }
    throw error;
  }
}
