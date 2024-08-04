import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllClassesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllClassesQuery = { __typename?: 'Query', getAllClasses: Array<{ __typename?: 'Class', id: number, name: string, year: number }> };


export const GetAllClassesDocument = gql`
    query GetAllClasses {
  getAllClasses {
    id
    name
    year
  }
}
    `;

/**
 * __useGetAllClassesQuery__
 *
 * To run a query within a React component, call `useGetAllClassesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllClassesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllClassesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllClassesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllClassesQuery, GetAllClassesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllClassesQuery, GetAllClassesQueryVariables>(GetAllClassesDocument, options);
      }
export function useGetAllClassesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllClassesQuery, GetAllClassesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllClassesQuery, GetAllClassesQueryVariables>(GetAllClassesDocument, options);
        }
export function useGetAllClassesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllClassesQuery, GetAllClassesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllClassesQuery, GetAllClassesQueryVariables>(GetAllClassesDocument, options);
        }
export type GetAllClassesQueryHookResult = ReturnType<typeof useGetAllClassesQuery>;
export type GetAllClassesLazyQueryHookResult = ReturnType<typeof useGetAllClassesLazyQuery>;
export type GetAllClassesSuspenseQueryHookResult = ReturnType<typeof useGetAllClassesSuspenseQuery>;
export type GetAllClassesQueryResult = Apollo.QueryResult<GetAllClassesQuery, GetAllClassesQueryVariables>;