import * as Types from '../../generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddStudentMutationVariables = Types.Exact<{
  data: Types.NewStudentInput;
}>;


export type AddStudentMutation = { __typename?: 'Mutation', addStudent: { __typename?: 'Student', id: number, firstname: string, lastname: string, email?: string | null, telephone?: string | null, avatar?: string | null, class?: { __typename?: 'Class', id: number } | null } };


export const AddStudentDocument = gql`
    mutation AddStudent($data: NewStudentInput!) {
  addStudent(data: $data) {
    id
    firstname
    lastname
    email
    telephone
    avatar
    class {
      id
    }
  }
}
    `;
export type AddStudentMutationFn = Apollo.MutationFunction<AddStudentMutation, AddStudentMutationVariables>;

/**
 * __useAddStudentMutation__
 *
 * To run a mutation, you first call `useAddStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addStudentMutation, { data, loading, error }] = useAddStudentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddStudentMutation(baseOptions?: Apollo.MutationHookOptions<AddStudentMutation, AddStudentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddStudentMutation, AddStudentMutationVariables>(AddStudentDocument, options);
      }
export type AddStudentMutationHookResult = ReturnType<typeof useAddStudentMutation>;
export type AddStudentMutationResult = Apollo.MutationResult<AddStudentMutation>;
export type AddStudentMutationOptions = Apollo.BaseMutationOptions<AddStudentMutation, AddStudentMutationVariables>;