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
  category: Scalars['String'];
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

export type Joined = {
  __typename?: 'Joined';
  userId: Scalars['Float'];
  user: User;
  queueId: Scalars['Float'];
  queue: Queue;
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
  queue: Queue;
  queues: Array<Queue>;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};


export type QueryQueueArgs = {
  id: Scalars['Int'];
};

export type Queue = {
  __typename?: 'Queue';
  id: Scalars['Float'];
  name: Scalars['String'];
  estimatedServingtime: Scalars['Float'];
  category: Scalars['String'];
  creatorId: Scalars['Float'];
  creator: User;
  onQueue: Array<Waiting>;
  joined: Array<Joined>;
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
  isCreator: Scalars['Boolean'];
};

export type Subscription = {
  __typename?: 'Subscription';
  registerUserSub: User;
  createQueueSub: Queue;
  joinQueueSub: Queue;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  onQueue: Array<Waiting>;
  createdQueues: Array<Queue>;
  joinedQueues: Array<Joined>;
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
  & Pick<User, 'id' | 'username'>
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

export type JoinQueueMutationVariables = Exact<{
  joinQueueInput: JoinQueueInput;
}>;


export type JoinQueueMutation = (
  { __typename?: 'Mutation' }
  & { joinQueue: (
    { __typename?: 'Queue' }
    & Pick<Queue, 'name' | 'waiting' | 'shortestWaitingTime' | 'longestWaitingTime'>
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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'isCreator'>
    & { joinedQueues: Array<(
      { __typename?: 'Joined' }
      & { queue: (
        { __typename?: 'Queue' }
        & Pick<Queue, 'id' | 'name'>
      ) }
    )> }
  )> }
);

export type GetQueueQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetQueueQuery = (
  { __typename?: 'Query' }
  & { queue: (
    { __typename?: 'Queue' }
    & Pick<Queue, 'name' | 'estimatedServingtime' | 'shortestWaitingTime' | 'longestWaitingTime' | 'waiting'>
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
    & Pick<Queue, 'id' | 'name' | 'category' | 'estimatedServingtime' | 'creatorId' | 'waiting' | 'shortestWaitingTime' | 'longestWaitingTime'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ) }
  )> }
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
export const JoinQueueDocument = gql`
    mutation joinQueue($joinQueueInput: JoinQueueInput!) {
  joinQueue(joinQueueInput: $joinQueueInput) {
    name
    waiting
    shortestWaitingTime
    longestWaitingTime
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
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    isCreator
    joinedQueues {
      queue {
        id
        name
      }
    }
  }
}
    `;

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
export const GetQueueDocument = gql`
    query GetQueue($id: Int!) {
  queue(id: $id) {
    name
    estimatedServingtime
    shortestWaitingTime
    longestWaitingTime
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
    category
    estimatedServingtime
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