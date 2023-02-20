import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Branch = {
  __typename?: 'Branch';
  branchReps: Array<BranchRep>;
  events: Array<Event>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type BranchRep = {
  __typename?: 'BranchRep';
  branchId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type College = {
  __typename?: 'College';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Error = {
  __typename?: 'Error';
  message: Scalars['String'];
};

export type Event = {
  __typename?: 'Event';
  branch: Branch;
  description?: Maybe<Scalars['String']>;
  eventDate?: Maybe<Scalars['Date']>;
  fees: Scalars['Int'];
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  organizer: Array<Organizer>;
  venue?: Maybe<Scalars['String']>;
};

export type EventCreateInput = {
  date?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  eventDate?: InputMaybe<Scalars['Date']>;
  name: Scalars['String'];
  venue?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCollege: MutationCreateCollegeResult;
  createEvent: MutationCreateEventResult;
  createPaymentOrder: MutationCreatePaymentOrderResult;
  login: MutationLoginResult;
  /** Refreshes the access token */
  refreshToken: MutationRefreshTokenResult;
  resetPassword: MutationResetPasswordResult;
  sendEmailVerification: MutationSendEmailVerificationResult;
  sendPasswordResetEmail: MutationSendPasswordResetEmailResult;
  signUp: MutationSignUpResult;
  verifyEmail: MutationVerifyEmailResult;
};


export type MutationCreateCollegeArgs = {
  details?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};


export type MutationCreateEventArgs = {
  data: EventCreateInput;
};


export type MutationCreatePaymentOrderArgs = {
  eventId?: InputMaybe<Scalars['ID']>;
  type: OrderType;
};


export type MutationLoginArgs = {
  data: UserLoginInput;
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationSendEmailVerificationArgs = {
  email: Scalars['String'];
};


export type MutationSendPasswordResetEmailArgs = {
  email: Scalars['String'];
};


export type MutationSignUpArgs = {
  data: UserCreateInput;
};


export type MutationVerifyEmailArgs = {
  token: Scalars['String'];
};

export type MutationCreateCollegeResult = Error | MutationCreateCollegeSuccess;

export type MutationCreateCollegeSuccess = {
  __typename?: 'MutationCreateCollegeSuccess';
  data: College;
};

export type MutationCreateEventResult = Error | MutationCreateEventSuccess;

export type MutationCreateEventSuccess = {
  __typename?: 'MutationCreateEventSuccess';
  data: Event;
};

export type MutationCreatePaymentOrderResult = Error | MutationCreatePaymentOrderSuccess;

export type MutationCreatePaymentOrderSuccess = {
  __typename?: 'MutationCreatePaymentOrderSuccess';
  data: PaymentOrder;
};

export type MutationLoginResult = Error | MutationLoginSuccess;

export type MutationLoginSuccess = {
  __typename?: 'MutationLoginSuccess';
  data: UserLoginPayload;
};

export type MutationRefreshTokenResult = Error | MutationRefreshTokenSuccess;

export type MutationRefreshTokenSuccess = {
  __typename?: 'MutationRefreshTokenSuccess';
  data: UserLoginPayload;
};

export type MutationResetPasswordResult = Error | MutationResetPasswordSuccess;

export type MutationResetPasswordSuccess = {
  __typename?: 'MutationResetPasswordSuccess';
  data: User;
};

export type MutationSendEmailVerificationResult = Error | MutationSendEmailVerificationSuccess;

export type MutationSendEmailVerificationSuccess = {
  __typename?: 'MutationSendEmailVerificationSuccess';
  data: Scalars['String'];
};

export type MutationSendPasswordResetEmailResult = Error | MutationSendPasswordResetEmailSuccess;

export type MutationSendPasswordResetEmailSuccess = {
  __typename?: 'MutationSendPasswordResetEmailSuccess';
  data: Scalars['String'];
};

export type MutationSignUpResult = Error | MutationSignUpSuccess;

export type MutationSignUpSuccess = {
  __typename?: 'MutationSignUpSuccess';
  data: User;
};

export type MutationVerifyEmailResult = Error | MutationVerifyEmailSuccess;

export type MutationVerifyEmailSuccess = {
  __typename?: 'MutationVerifyEmailSuccess';
  data: User;
};

export enum OrderType {
  EventRegistration = 'EVENT_REGISTRATION',
  FestRegistration = 'FEST_REGISTRATION'
}

export type Organizer = {
  __typename?: 'Organizer';
  eventId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type PaymentOrder = {
  __typename?: 'PaymentOrder';
  amount: Scalars['Int'];
  id: Scalars['ID'];
  orderId: Scalars['ID'];
  status: Scalars['String'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  colleges: Array<College>;
  events: QueryEventsConnection;
  me: QueryMeResult;
  users: QueryUsersConnection;
};


export type QueryEventsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  contains?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  contains?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type QueryEventsConnection = {
  __typename?: 'QueryEventsConnection';
  edges: Array<Maybe<QueryEventsConnectionEdge>>;
  pageInfo: PageInfo;
};

export type QueryEventsConnectionEdge = {
  __typename?: 'QueryEventsConnectionEdge';
  cursor: Scalars['String'];
  node: Event;
};

export type QueryMeResult = Error | QueryMeSuccess;

export type QueryMeSuccess = {
  __typename?: 'QueryMeSuccess';
  data: User;
};

export type QueryUsersConnection = {
  __typename?: 'QueryUsersConnection';
  edges: Array<Maybe<QueryUsersConnectionEdge>>;
  pageInfo: PageInfo;
};

export type QueryUsersConnectionEdge = {
  __typename?: 'QueryUsersConnectionEdge';
  cursor: Scalars['String'];
  node: User;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  id: Scalars['ID'];
  isVerified: Scalars['Boolean'];
  name: Scalars['String'];
  role: Scalars['String'];
};

export type UserCreateInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type UserLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserLoginPayload = {
  __typename?: 'UserLoginPayload';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type FestRegPaymentOrderMutationVariables = Exact<{ [key: string]: never; }>;


export type FestRegPaymentOrderMutation = { __typename?: 'Mutation', createPaymentOrder: { __typename: 'Error', message: string } | { __typename: 'MutationCreatePaymentOrderSuccess', data: { __typename?: 'PaymentOrder', amount: number, orderId: string, status: string, user: { __typename?: 'User', email: string, name: string } } } };

export type RefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename: 'Error', message: string } | { __typename: 'MutationRefreshTokenSuccess', data: { __typename?: 'UserLoginPayload', accessToken: string, refreshToken: string } } };

export type ResetPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', sendPasswordResetEmail: { __typename: 'Error', message: string } | { __typename: 'MutationSendPasswordResetEmailSuccess', data: string } };

export type SignInMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignInMutation = { __typename?: 'Mutation', login: { __typename: 'Error', message: string } | { __typename: 'MutationLoginSuccess', data: { __typename?: 'UserLoginPayload', accessToken: string, refreshToken: string } } };

export type SignUpMutationVariables = Exact<{
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename: 'Error', message: string } | { __typename: 'MutationSignUpSuccess' } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename: 'Error', message: string } | { __typename: 'QueryMeSuccess', data: { __typename?: 'User', createdAt: any, email: string, id: string, isVerified: boolean, name: string, role: string } } };


export const FestRegPaymentOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FestRegPaymentOrder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPaymentOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"EnumValue","value":"FEST_REGISTRATION"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationCreatePaymentOrderSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<FestRegPaymentOrderMutation, FestRegPaymentOrderMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"refreshToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationRefreshTokenSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendPasswordResetEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationSendPasswordResetEmailSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const SignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationLoginSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationSignUpSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryMeSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;