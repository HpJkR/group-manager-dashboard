import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetClassByIdQueryVariables = Types.Exact<{
  getClassByIdId: Types.Scalars['Int']['input'];
}>;


export type GetClassByIdQuery = { __typename?: 'Query', getClassById?: { __typename?: 'Class', id: number, name: string, year: number } | null };


export const GetClassByIdDocument = gql`
    query GetClassById($getClassByIdId: Int!) {
  getClassById(id: $getClassByIdId) {
    id
    name
    year
  }
}
    `;

/**
 * __useGetClassByIdQuery__
 *
 * To run a query within a React component, call `useGetClassByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClassByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClassByIdQuery({
 *   variables: {
 *      getClassByIdId: // value for 'getClassByIdId'
 *   },
 * });
 */
export function useGetClassByIdQuery(baseOptions: Apollo.QueryHookOptions<GetClassByIdQuery, GetClassByIdQueryVariables> & ({ variables: GetClassByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetClassByIdQuery, GetClassByIdQueryVariables>(GetClassByIdDocument, options);
      }
export function useGetClassByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClassByIdQuery, GetClassByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetClassByIdQuery, GetClassByIdQueryVariables>(GetClassByIdDocument, options);
        }
export function useGetClassByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetClassByIdQuery, GetClassByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetClassByIdQuery, GetClassByIdQueryVariables>(GetClassByIdDocument, options);
        }
export type GetClassByIdQueryHookResult = ReturnType<typeof useGetClassByIdQuery>;
export type GetClassByIdLazyQueryHookResult = ReturnType<typeof useGetClassByIdLazyQuery>;
export type GetClassByIdSuspenseQueryHookResult = ReturnType<typeof useGetClassByIdSuspenseQuery>;
export type GetClassByIdQueryResult = Apollo.QueryResult<GetClassByIdQuery, GetClassByIdQueryVariables>;