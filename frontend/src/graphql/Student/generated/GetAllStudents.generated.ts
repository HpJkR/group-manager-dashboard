import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllStudentsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllStudentsQuery = { __typename?: 'Query', getAllStudents: Array<{ __typename?: 'Student', id: number, lastname: string, firstname: string, email?: string | null, telephone?: string | null, avatar?: string | null, class?: { __typename?: 'Class', id: number, name: string, year: number } | null }> };


export const GetAllStudentsDocument = gql`
    query GetAllStudents {
  getAllStudents {
    id
    lastname
    firstname
    email
    telephone
    avatar
    class {
      id
      name
      year
    }
  }
}
    `;

/**
 * __useGetAllStudentsQuery__
 *
 * To run a query within a React component, call `useGetAllStudentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllStudentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllStudentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllStudentsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllStudentsQuery, GetAllStudentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllStudentsQuery, GetAllStudentsQueryVariables>(GetAllStudentsDocument, options);
      }
export function useGetAllStudentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllStudentsQuery, GetAllStudentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllStudentsQuery, GetAllStudentsQueryVariables>(GetAllStudentsDocument, options);
        }
export function useGetAllStudentsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllStudentsQuery, GetAllStudentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllStudentsQuery, GetAllStudentsQueryVariables>(GetAllStudentsDocument, options);
        }
export type GetAllStudentsQueryHookResult = ReturnType<typeof useGetAllStudentsQuery>;
export type GetAllStudentsLazyQueryHookResult = ReturnType<typeof useGetAllStudentsLazyQuery>;
export type GetAllStudentsSuspenseQueryHookResult = ReturnType<typeof useGetAllStudentsSuspenseQuery>;
export type GetAllStudentsQueryResult = Apollo.QueryResult<GetAllStudentsQuery, GetAllStudentsQueryVariables>;