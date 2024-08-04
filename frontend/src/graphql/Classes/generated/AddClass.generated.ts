import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddClassMutationVariables = Types.Exact<{
  data: Types.NewClassInput;
}>;


export type AddClassMutation = { __typename?: 'Mutation', addClass: { __typename?: 'Class', id: number, name: string, year: number } };


export const AddClassDocument = gql`
    mutation AddClass($data: NewClassInput!) {
  addClass(data: $data) {
    id
    name
    year
  }
}
    `;
export type AddClassMutationFn = Apollo.MutationFunction<AddClassMutation, AddClassMutationVariables>;

/**
 * __useAddClassMutation__
 *
 * To run a mutation, you first call `useAddClassMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddClassMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addClassMutation, { data, loading, error }] = useAddClassMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddClassMutation(baseOptions?: Apollo.MutationHookOptions<AddClassMutation, AddClassMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddClassMutation, AddClassMutationVariables>(AddClassDocument, options);
      }
export type AddClassMutationHookResult = ReturnType<typeof useAddClassMutation>;
export type AddClassMutationResult = Apollo.MutationResult<AddClassMutation>;
export type AddClassMutationOptions = Apollo.BaseMutationOptions<AddClassMutation, AddClassMutationVariables>;