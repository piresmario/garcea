import { graphql } from "graphql";
import { schema } from "@/graphql/schema";
import { createContext } from "@/graphql/context";

export async function executeGraphQL<T>(
  source: string,
  variableValues?: Record<string, unknown>,
): Promise<T> {
  const contextValue = await createContext();
  const result = await graphql({ schema, source, variableValues, contextValue });

  if (result.errors?.length) {
    throw new Error(result.errors.map((error) => error.message).join("; "));
  }

  return result.data as T;
}
