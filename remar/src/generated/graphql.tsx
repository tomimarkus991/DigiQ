import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateQueueInput = {
  name: Scalars['String'];
  imageUri: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type JoinQueueInput = {
  queueId: Scalars['Float'];
  value: Scalars['Float'];
};

export type LoginUserInput = {
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  makeUserCreator: Scalars['Boolean'];
  createQueue: Queue;
  joinQueue: Queue;
};


export type MutationRegisterArgs = {
  registerUserInput: RegisterUserInput;
};


export type MutationLoginArgs = {
  loginUserInput: LoginUserInput;
};


export type MutationCreateQueueArgs = {
  createQueueInput: CreateQueueInput;
};


export type MutationJoinQueueArgs = {
  joinQueueInput: JoinQueueInput;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  user?: Maybe<User>;
  getMyQueues?: Maybe<Array<Waiting>>;
  userByEmail?: Maybe<User>;
  queue: Queue;
  positionInQueue: Scalars['Int'];
  hasUserJoinedThisQueue: Scalars['Boolean'];
  queues: Array<Queue>;
  search: Array<Queue>;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};


export type QueryUserByEmailArgs = {
  email: Scalars['String'];
};


export type QueryQueueArgs = {
  id: Scalars['Int'];
};


export type QueryPositionInQueueArgs = {
  id: Scalars['Int'];
};


export type QueryHasUserJoinedThisQueueArgs = {
  queueId: Scalars['Int'];
};


export type QuerySearchArgs = {
  searchString: Scalars['String'];
};

export type Queue = {
  __typename?: 'Queue';
  id: Scalars['Float'];
  name: Scalars['String'];
  estimatedServingtime: Scalars['Float'];
  creatorId: Scalars['Float'];
  imageUri: Scalars['String'];
  creator: User;
  onQueue: Array<Waiting>;
  waiting: Scalars['Float'];
  shortestWaitingTime: Scalars['Float'];
  longestWaitingTime: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type RegisterUserInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  registerUserSub: User;
  createQueueSub: Queue;
  joinQueueSub: Queue;
};


export type SubscriptionJoinQueueSubArgs = {
  id: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  onQueue: Array<Waiting>;
  createdQueues: Array<Queue>;
  isCreator: Scalars['Boolean'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type Waiting = {
  __typename?: 'Waiting';
  value: Scalars['Float'];
  userId: Scalars['Float'];
  user: User;
  queueId: Scalars['Float'];
  queue: Queue;
};

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'isCreator'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type CreateQueueMutationVariables = Exact<{
  createQueueInput: CreateQueueInput;
}>;


export type CreateQueueMutation = (
  { __typename?: 'Mutation' }
  & { createQueue: (
    { __typename?: 'Queue' }
    & Pick<Queue, 'id' | 'name' | 'imageUri'>
  ) }
);

export type JoinQueueMutationVariables = Exact<{
  joinQueueInput: JoinQueueInput;
}>;


export type JoinQueueMutation = (
  { __typename?: 'Mutation' }
  & { joinQueue: (
    { __typename?: 'Queue' }
    & Pick<Queue, 'name' | 'estimatedServingtime' | 'shortestWaitingTime' | 'longestWaitingTime' | 'waiting'>
  ) }
);

export type LoginMutationVariables = Exact<{
  loginUserInput: LoginUserInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MakeUserCreatorMutationVariables = Exact<{ [key: string]: never; }>;


export type MakeUserCreatorMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'makeUserCreator'>
);

export type RegisterMutationVariables = Exact<{
  registerUserInput: RegisterUserInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type CheckIfQueueExistsQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type CheckIfQueueExistsQuery = (
  { __typename?: 'Query' }
  & { queue: (
    { __typename?: 'Queue' }
    & Pick<Queue, 'id' | 'name'>
  ) }
);

export type GetMyQueuesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyQueuesQuery = (
  { __typename?: 'Query' }
  & { getMyQueues?: Maybe<Array<(
    { __typename?: 'Waiting' }
    & { queue: (
      { __typename?: 'Queue' }
      & Pick<Queue, 'id' | 'name' | 'estimatedServingtime' | 'shortestWaitingTime' | 'longestWaitingTime' | 'waiting' | 'imageUri'>
    ) }
  )>> }
);

export type HasUserJoinedThisQueueQueryVariables = Exact<{
  queueId: Scalars['Int'];
}>;


export type HasUserJoinedThisQueueQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hasUserJoinedThisQueue'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type MeAdvancedQueryVariables = Exact<{ [key: string]: never; }>;


export type MeAdvancedQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'isCreator'>
    & { onQueue: Array<(
      { __typename?: 'Waiting' }
      & { queue: (
        { __typename?: 'Queue' }
        & Pick<Queue, 'id' | 'name' | 'estimatedServingtime' | 'shortestWaitingTime' | 'longestWaitingTime' | 'waiting'>
      ) }
    )> }
  )> }
);

export type PositionInQueueQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PositionInQueueQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'positionInQueue'>
);

export type GetQueueQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetQueueQuery = (
  { __typename?: 'Query' }
  & { queue: (
    { __typename?: 'Queue' }
    & Pick<Queue, 'name' | 'estimatedServingtime' | 'shortestWaitingTime' | 'longestWaitingTime' | 'imageUri' | 'waiting'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ) }
  ) }
);

export type QueuesQueryVariables = Exact<{ [key: string]: never; }>;


export type QueuesQuery = (
  { __typename?: 'Query' }
  & { queues: Array<(
    { __typename?: 'Queue' }
    & Pick<Queue, 'id' | 'name' | 'estimatedServingtime' | 'imageUri' | 'creatorId' | 'waiting' | 'shortestWaitingTime' | 'longestWaitingTime'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ) }
  )> }
);

export type SearchQueuesQueryVariables = Exact<{
  searchString: Scalars['String'];
}>;


export type SearchQueuesQuery = (
  { __typename?: 'Query' }
  & { search: Array<(
    { __typename?: 'Queue' }
    & Pick<Queue, 'id' | 'name' | 'estimatedServingtime' | 'creatorId' | 'imageUri' | 'waiting' | 'shortestWaitingTime' | 'longestWaitingTime'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ) }
  )> }
);

export type CreateQueueSubSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CreateQueueSubSubscription = (
  { __typename?: 'Subscription' }
  & { createQueueSub: (
    { __typename?: 'Queue' }
    & Pick<Queue, 'id' | 'name' | 'creatorId' | 'estimatedServingtime' | 'waiting' | 'shortestWaitingTime' | 'longestWaitingTime'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ) }
  ) }
);

export type JoinQueueSubSubscriptionVariables = Exact<{
  id: Scalars['Float'];
}>;


export type JoinQueueSubSubscription = (
  { __typename?: 'Subscription' }
  & { joinQueueSub: (
    { __typename?: 'Queue' }
    & Pick<Queue, 'name' | 'estimatedServingtime' | 'shortestWaitingTime' | 'longestWaitingTime' | 'waiting' | 'imageUri'>
  ) }
);

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  isCreator
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const CreateQueueDocument = gql`
    mutation CreateQueue($createQueueInput: CreateQueueInput!) {
  createQueue(createQueueInput: $createQueueInput) {
    id
    name
    imageUri
  }
}
    `;
export type CreateQueueMutationFn = Apollo.MutationFunction<CreateQueueMutation, CreateQueueMutationVariables>;

/**
 * __useCreateQueueMutation__
 *
 * To run a mutation, you first call `useCreateQueueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQueueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQueueMutation, { data, loading, error }] = useCreateQueueMutation({
 *   variables: {
 *      createQueueInput: // value for 'createQueueInput'
 *   },
 * });
 */
export function useCreateQueueMutation(baseOptions?: Apollo.MutationHookOptions<CreateQueueMutation, CreateQueueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateQueueMutation, CreateQueueMutationVariables>(CreateQueueDocument, options);
      }
export type CreateQueueMutationHookResult = ReturnType<typeof useCreateQueueMutation>;
export type CreateQueueMutationResult = Apollo.MutationResult<CreateQueueMutation>;
export type CreateQueueMutationOptions = Apollo.BaseMutationOptions<CreateQueueMutation, CreateQueueMutationVariables>;
export const JoinQueueDocument = gql`
    mutation joinQueue($joinQueueInput: JoinQueueInput!) {
  joinQueue(joinQueueInput: $joinQueueInput) {
    name
    estimatedServingtime
    shortestWaitingTime
    longestWaitingTime
    waiting
  }
}
    `;
export type JoinQueueMutationFn = Apollo.MutationFunction<JoinQueueMutation, JoinQueueMutationVariables>;

/**
 * __useJoinQueueMutation__
 *
 * To run a mutation, you first call `useJoinQueueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinQueueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinQueueMutation, { data, loading, error }] = useJoinQueueMutation({
 *   variables: {
 *      joinQueueInput: // value for 'joinQueueInput'
 *   },
 * });
 */
export function useJoinQueueMutation(baseOptions?: Apollo.MutationHookOptions<JoinQueueMutation, JoinQueueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinQueueMutation, JoinQueueMutationVariables>(JoinQueueDocument, options);
      }
export type JoinQueueMutationHookResult = ReturnType<typeof useJoinQueueMutation>;
export type JoinQueueMutationResult = Apollo.MutationResult<JoinQueueMutation>;
export type JoinQueueMutationOptions = Apollo.BaseMutationOptions<JoinQueueMutation, JoinQueueMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginUserInput: LoginUserInput!) {
  login(loginUserInput: $loginUserInput) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginUserInput: // value for 'loginUserInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MakeUserCreatorDocument = gql`
    mutation MakeUserCreator {
  makeUserCreator
}
    `;
export type MakeUserCreatorMutationFn = Apollo.MutationFunction<MakeUserCreatorMutation, MakeUserCreatorMutationVariables>;

/**
 * __useMakeUserCreatorMutation__
 *
 * To run a mutation, you first call `useMakeUserCreatorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakeUserCreatorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeUserCreatorMutation, { data, loading, error }] = useMakeUserCreatorMutation({
 *   variables: {
 *   },
 * });
 */
export function useMakeUserCreatorMutation(baseOptions?: Apollo.MutationHookOptions<MakeUserCreatorMutation, MakeUserCreatorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MakeUserCreatorMutation, MakeUserCreatorMutationVariables>(MakeUserCreatorDocument, options);
      }
export type MakeUserCreatorMutationHookResult = ReturnType<typeof useMakeUserCreatorMutation>;
export type MakeUserCreatorMutationResult = Apollo.MutationResult<MakeUserCreatorMutation>;
export type MakeUserCreatorMutationOptions = Apollo.BaseMutationOptions<MakeUserCreatorMutation, MakeUserCreatorMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($registerUserInput: RegisterUserInput!) {
  register(registerUserInput: $registerUserInput) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerUserInput: // value for 'registerUserInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const CheckIfQueueExistsDocument = gql`
    query CheckIfQueueExists($id: Int!) {
  queue(id: $id) {
    id
    name
  }
}
    `;

/**
 * __useCheckIfQueueExistsQuery__
 *
 * To run a query within a React component, call `useCheckIfQueueExistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckIfQueueExistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckIfQueueExistsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCheckIfQueueExistsQuery(baseOptions: Apollo.QueryHookOptions<CheckIfQueueExistsQuery, CheckIfQueueExistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckIfQueueExistsQuery, CheckIfQueueExistsQueryVariables>(CheckIfQueueExistsDocument, options);
      }
export function useCheckIfQueueExistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckIfQueueExistsQuery, CheckIfQueueExistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckIfQueueExistsQuery, CheckIfQueueExistsQueryVariables>(CheckIfQueueExistsDocument, options);
        }
export type CheckIfQueueExistsQueryHookResult = ReturnType<typeof useCheckIfQueueExistsQuery>;
export type CheckIfQueueExistsLazyQueryHookResult = ReturnType<typeof useCheckIfQueueExistsLazyQuery>;
export type CheckIfQueueExistsQueryResult = Apollo.QueryResult<CheckIfQueueExistsQuery, CheckIfQueueExistsQueryVariables>;
export const GetMyQueuesDocument = gql`
    query GetMyQueues {
  getMyQueues {
    queue {
      id
      name
      estimatedServingtime
      shortestWaitingTime
      longestWaitingTime
      waiting
      imageUri
    }
  }
}
    `;

/**
 * __useGetMyQueuesQuery__
 *
 * To run a query within a React component, call `useGetMyQueuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyQueuesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyQueuesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyQueuesQuery(baseOptions?: Apollo.QueryHookOptions<GetMyQueuesQuery, GetMyQueuesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyQueuesQuery, GetMyQueuesQueryVariables>(GetMyQueuesDocument, options);
      }
export function useGetMyQueuesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyQueuesQuery, GetMyQueuesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyQueuesQuery, GetMyQueuesQueryVariables>(GetMyQueuesDocument, options);
        }
export type GetMyQueuesQueryHookResult = ReturnType<typeof useGetMyQueuesQuery>;
export type GetMyQueuesLazyQueryHookResult = ReturnType<typeof useGetMyQueuesLazyQuery>;
export type GetMyQueuesQueryResult = Apollo.QueryResult<GetMyQueuesQuery, GetMyQueuesQueryVariables>;
export const HasUserJoinedThisQueueDocument = gql`
    query HasUserJoinedThisQueue($queueId: Int!) {
  hasUserJoinedThisQueue(queueId: $queueId)
}
    `;

/**
 * __useHasUserJoinedThisQueueQuery__
 *
 * To run a query within a React component, call `useHasUserJoinedThisQueueQuery` and pass it any options that fit your needs.
 * When your component renders, `useHasUserJoinedThisQueueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHasUserJoinedThisQueueQuery({
 *   variables: {
 *      queueId: // value for 'queueId'
 *   },
 * });
 */
export function useHasUserJoinedThisQueueQuery(baseOptions: Apollo.QueryHookOptions<HasUserJoinedThisQueueQuery, HasUserJoinedThisQueueQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HasUserJoinedThisQueueQuery, HasUserJoinedThisQueueQueryVariables>(HasUserJoinedThisQueueDocument, options);
      }
export function useHasUserJoinedThisQueueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HasUserJoinedThisQueueQuery, HasUserJoinedThisQueueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HasUserJoinedThisQueueQuery, HasUserJoinedThisQueueQueryVariables>(HasUserJoinedThisQueueDocument, options);
        }
export type HasUserJoinedThisQueueQueryHookResult = ReturnType<typeof useHasUserJoinedThisQueueQuery>;
export type HasUserJoinedThisQueueLazyQueryHookResult = ReturnType<typeof useHasUserJoinedThisQueueLazyQuery>;
export type HasUserJoinedThisQueueQueryResult = Apollo.QueryResult<HasUserJoinedThisQueueQuery, HasUserJoinedThisQueueQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MeAdvancedDocument = gql`
    query MeAdvanced {
  me {
    id
    username
    isCreator
    onQueue {
      queue {
        id
        name
        estimatedServingtime
        shortestWaitingTime
        longestWaitingTime
        waiting
      }
    }
  }
}
    `;

/**
 * __useMeAdvancedQuery__
 *
 * To run a query within a React component, call `useMeAdvancedQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeAdvancedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeAdvancedQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeAdvancedQuery(baseOptions?: Apollo.QueryHookOptions<MeAdvancedQuery, MeAdvancedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeAdvancedQuery, MeAdvancedQueryVariables>(MeAdvancedDocument, options);
      }
export function useMeAdvancedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeAdvancedQuery, MeAdvancedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeAdvancedQuery, MeAdvancedQueryVariables>(MeAdvancedDocument, options);
        }
export type MeAdvancedQueryHookResult = ReturnType<typeof useMeAdvancedQuery>;
export type MeAdvancedLazyQueryHookResult = ReturnType<typeof useMeAdvancedLazyQuery>;
export type MeAdvancedQueryResult = Apollo.QueryResult<MeAdvancedQuery, MeAdvancedQueryVariables>;
export const PositionInQueueDocument = gql`
    query PositionInQueue($id: Int!) {
  positionInQueue(id: $id)
}
    `;

/**
 * __usePositionInQueueQuery__
 *
 * To run a query within a React component, call `usePositionInQueueQuery` and pass it any options that fit your needs.
 * When your component renders, `usePositionInQueueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePositionInQueueQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePositionInQueueQuery(baseOptions: Apollo.QueryHookOptions<PositionInQueueQuery, PositionInQueueQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PositionInQueueQuery, PositionInQueueQueryVariables>(PositionInQueueDocument, options);
      }
export function usePositionInQueueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PositionInQueueQuery, PositionInQueueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PositionInQueueQuery, PositionInQueueQueryVariables>(PositionInQueueDocument, options);
        }
export type PositionInQueueQueryHookResult = ReturnType<typeof usePositionInQueueQuery>;
export type PositionInQueueLazyQueryHookResult = ReturnType<typeof usePositionInQueueLazyQuery>;
export type PositionInQueueQueryResult = Apollo.QueryResult<PositionInQueueQuery, PositionInQueueQueryVariables>;
export const GetQueueDocument = gql`
    query GetQueue($id: Int!) {
  queue(id: $id) {
    name
    estimatedServingtime
    shortestWaitingTime
    longestWaitingTime
    imageUri
    waiting
    creator {
      username
    }
  }
}
    `;

/**
 * __useGetQueueQuery__
 *
 * To run a query within a React component, call `useGetQueueQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQueueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQueueQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetQueueQuery(baseOptions: Apollo.QueryHookOptions<GetQueueQuery, GetQueueQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQueueQuery, GetQueueQueryVariables>(GetQueueDocument, options);
      }
export function useGetQueueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQueueQuery, GetQueueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQueueQuery, GetQueueQueryVariables>(GetQueueDocument, options);
        }
export type GetQueueQueryHookResult = ReturnType<typeof useGetQueueQuery>;
export type GetQueueLazyQueryHookResult = ReturnType<typeof useGetQueueLazyQuery>;
export type GetQueueQueryResult = Apollo.QueryResult<GetQueueQuery, GetQueueQueryVariables>;
export const QueuesDocument = gql`
    query Queues {
  queues {
    id
    name
    estimatedServingtime
    imageUri
    creatorId
    creator {
      username
    }
    waiting
    shortestWaitingTime
    longestWaitingTime
  }
}
    `;

/**
 * __useQueuesQuery__
 *
 * To run a query within a React component, call `useQueuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueuesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueuesQuery({
 *   variables: {
 *   },
 * });
 */
export function useQueuesQuery(baseOptions?: Apollo.QueryHookOptions<QueuesQuery, QueuesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueuesQuery, QueuesQueryVariables>(QueuesDocument, options);
      }
export function useQueuesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueuesQuery, QueuesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueuesQuery, QueuesQueryVariables>(QueuesDocument, options);
        }
export type QueuesQueryHookResult = ReturnType<typeof useQueuesQuery>;
export type QueuesLazyQueryHookResult = ReturnType<typeof useQueuesLazyQuery>;
export type QueuesQueryResult = Apollo.QueryResult<QueuesQuery, QueuesQueryVariables>;
export const SearchQueuesDocument = gql`
    query SearchQueues($searchString: String!) {
  search(searchString: $searchString) {
    id
    name
    estimatedServingtime
    creatorId
    imageUri
    creator {
      username
    }
    waiting
    shortestWaitingTime
    longestWaitingTime
  }
}
    `;

/**
 * __useSearchQueuesQuery__
 *
 * To run a query within a React component, call `useSearchQueuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQueuesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQueuesQuery({
 *   variables: {
 *      searchString: // value for 'searchString'
 *   },
 * });
 */
export function useSearchQueuesQuery(baseOptions: Apollo.QueryHookOptions<SearchQueuesQuery, SearchQueuesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchQueuesQuery, SearchQueuesQueryVariables>(SearchQueuesDocument, options);
      }
export function useSearchQueuesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchQueuesQuery, SearchQueuesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchQueuesQuery, SearchQueuesQueryVariables>(SearchQueuesDocument, options);
        }
export type SearchQueuesQueryHookResult = ReturnType<typeof useSearchQueuesQuery>;
export type SearchQueuesLazyQueryHookResult = ReturnType<typeof useSearchQueuesLazyQuery>;
export type SearchQueuesQueryResult = Apollo.QueryResult<SearchQueuesQuery, SearchQueuesQueryVariables>;
export const CreateQueueSubDocument = gql`
    subscription CreateQueueSub {
  createQueueSub {
    id
    name
    creatorId
    creator {
      username
    }
    estimatedServingtime
    waiting
    shortestWaitingTime
    longestWaitingTime
  }
}
    `;

/**
 * __useCreateQueueSubSubscription__
 *
 * To run a query within a React component, call `useCreateQueueSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useCreateQueueSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCreateQueueSubSubscription({
 *   variables: {
 *   },
 * });
 */
export function useCreateQueueSubSubscription(baseOptions?: Apollo.SubscriptionHookOptions<CreateQueueSubSubscription, CreateQueueSubSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<CreateQueueSubSubscription, CreateQueueSubSubscriptionVariables>(CreateQueueSubDocument, options);
      }
export type CreateQueueSubSubscriptionHookResult = ReturnType<typeof useCreateQueueSubSubscription>;
export type CreateQueueSubSubscriptionResult = Apollo.SubscriptionResult<CreateQueueSubSubscription>;
export const JoinQueueSubDocument = gql`
    subscription JoinQueueSub($id: Float!) {
  joinQueueSub(id: $id) {
    name
    estimatedServingtime
    shortestWaitingTime
    longestWaitingTime
    waiting
    imageUri
  }
}
    `;

/**
 * __useJoinQueueSubSubscription__
 *
 * To run a query within a React component, call `useJoinQueueSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `useJoinQueueSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJoinQueueSubSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useJoinQueueSubSubscription(baseOptions: Apollo.SubscriptionHookOptions<JoinQueueSubSubscription, JoinQueueSubSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<JoinQueueSubSubscription, JoinQueueSubSubscriptionVariables>(JoinQueueSubDocument, options);
      }
export type JoinQueueSubSubscriptionHookResult = ReturnType<typeof useJoinQueueSubSubscription>;
export type JoinQueueSubSubscriptionResult = Apollo.SubscriptionResult<JoinQueueSubSubscription>;