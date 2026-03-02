import { DocumentNode, print } from 'graphql';

interface GraphQLError {
  message: string;
  extensions?: Record<string, unknown>;
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}

export async function graphqlFetcher<T = unknown>(
  query: DocumentNode | string,
  variables?: Record<string, unknown>,
  options?: {
    headers?: Record<string, string>;
  }
): Promise<T> {
  const queryString = typeof query === 'string' ? query : print(query);

  const response = await fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    body: JSON.stringify({
      query: queryString,
      variables,
    }),
  });

  const json = (await response.json()) as GraphQLResponse<T>;

  if (json.errors) {
    const realErrors = json.errors.filter((err) => {
      return (
        !err.message?.includes("Unknown type '_Any'") && !err.message?.includes("Field '_entities'")
      );
    });

    if (realErrors.length > 0) {
      throw new Error(realErrors[0].message);
    }
  }

  return json.data as T;
}

export const graphqlFetcherWithTracking = graphqlFetcher;
