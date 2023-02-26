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
  eventType: Scalars['String'];
  fees: Scalars['Int'];
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  maxTeamSize: Scalars['Int'];
  maxTeams?: Maybe<Scalars['Int']>;
  minTeamSize: Scalars['Int'];
  name: Scalars['String'];
  organizers: Array<Organizer>;
  published: Scalars['Boolean'];
  rounds: Array<Round>;
  teams: Array<Team>;
  venue?: Maybe<Scalars['String']>;
};

export type EventCreateInput = {
  description?: InputMaybe<Scalars['String']>;
  eventDate?: InputMaybe<Scalars['Date']>;
  eventType?: InputMaybe<EventType>;
  name: Scalars['String'];
  venue?: InputMaybe<Scalars['String']>;
};

export enum EventType {
  Individual = 'INDIVIDUAL',
  IndividualMultipleEntry = 'INDIVIDUAL_MULTIPLE_ENTRY',
  Team = 'TEAM',
  TeamMultipleEntry = 'TEAM_MULTIPLE_ENTRY'
}

export type EventUpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  eventDate?: InputMaybe<Scalars['Date']>;
  eventType?: InputMaybe<EventType>;
  fees?: InputMaybe<Scalars['Int']>;
  maxTeamSize?: InputMaybe<Scalars['Int']>;
  maxTeams?: InputMaybe<Scalars['Int']>;
  minTeamSize?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  venue?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addBranch: MutationAddBranchResult;
  addBranchRep: MutationAddBranchRepResult;
  addOrganizer: MutationAddOrganizerResult;
  confirmTeam: MutationConfirmTeamResult;
  createCollege: MutationCreateCollegeResult;
  createEvent: MutationCreateEventResult;
  createPaymentOrder: MutationCreatePaymentOrderResult;
  createRound: MutationCreateRoundResult;
  createTeam: MutationCreateTeamResult;
  deleteEvent: MutationDeleteEventResult;
  deleteRound: MutationDeleteRoundResult;
  deleteTeam: MutationDeleteTeamResult;
  joinTeam: MutationJoinTeamResult;
  leaveTeam: MutationLeaveTeamResult;
  login: MutationLoginResult;
  organizerAddTeamMember: MutationOrganizerAddTeamMemberResult;
  organizerCreateTeam: MutationOrganizerCreateTeamResult;
  organizerDeleteTeam: MutationOrganizerDeleteTeamResult;
  organizerDeleteTeamMember: MutationOrganizerDeleteTeamMemberResult;
  organizerMarkAttendance: MutationOrganizerMarkAttendanceResult;
  /** Refreshes the access token */
  refreshToken: MutationRefreshTokenResult;
  registerSoloEvent: MutationRegisterSoloEventResult;
  removeOrganizer: MutationRemoveOrganizerResult;
  resetPassword: MutationResetPasswordResult;
  sendEmailVerification: MutationSendEmailVerificationResult;
  sendPasswordResetEmail: MutationSendPasswordResetEmailResult;
  signUp: MutationSignUpResult;
  updateEvent: MutationUpdateEventResult;
  verifyEmail: MutationVerifyEmailResult;
};


export type MutationAddBranchArgs = {
  name: Scalars['String'];
};


export type MutationAddBranchRepArgs = {
  branchId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationAddOrganizerArgs = {
  eventId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationConfirmTeamArgs = {
  teamId: Scalars['ID'];
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


export type MutationCreateRoundArgs = {
  eventId: Scalars['ID'];
};


export type MutationCreateTeamArgs = {
  eventId: Scalars['ID'];
  name: Scalars['String'];
};


export type MutationDeleteEventArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteRoundArgs = {
  eventId: Scalars['ID'];
};


export type MutationDeleteTeamArgs = {
  teamId: Scalars['ID'];
};


export type MutationJoinTeamArgs = {
  teamId: Scalars['ID'];
};


export type MutationLeaveTeamArgs = {
  teamId: Scalars['ID'];
};


export type MutationLoginArgs = {
  data: UserLoginInput;
};


export type MutationOrganizerAddTeamMemberArgs = {
  teamId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationOrganizerCreateTeamArgs = {
  eventId: Scalars['ID'];
  name: Scalars['String'];
};


export type MutationOrganizerDeleteTeamArgs = {
  teamId: Scalars['ID'];
};


export type MutationOrganizerDeleteTeamMemberArgs = {
  teamId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationOrganizerMarkAttendanceArgs = {
  attended?: Scalars['Boolean'];
  teamId: Scalars['ID'];
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String'];
};


export type MutationRegisterSoloEventArgs = {
  eventId: Scalars['ID'];
};


export type MutationRemoveOrganizerArgs = {
  eventId: Scalars['ID'];
  userId: Scalars['ID'];
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


export type MutationUpdateEventArgs = {
  data: EventUpdateInput;
  id: Scalars['ID'];
};


export type MutationVerifyEmailArgs = {
  token: Scalars['String'];
};

export type MutationAddBranchRepResult = Error | MutationAddBranchRepSuccess;

export type MutationAddBranchRepSuccess = {
  __typename?: 'MutationAddBranchRepSuccess';
  data: BranchRep;
};

export type MutationAddBranchResult = Error | MutationAddBranchSuccess;

export type MutationAddBranchSuccess = {
  __typename?: 'MutationAddBranchSuccess';
  data: Branch;
};

export type MutationAddOrganizerResult = Error | MutationAddOrganizerSuccess;

export type MutationAddOrganizerSuccess = {
  __typename?: 'MutationAddOrganizerSuccess';
  data: Organizer;
};

export type MutationConfirmTeamResult = Error | MutationConfirmTeamSuccess;

export type MutationConfirmTeamSuccess = {
  __typename?: 'MutationConfirmTeamSuccess';
  data: Team;
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

export type MutationCreateRoundResult = Error | MutationCreateRoundSuccess;

export type MutationCreateRoundSuccess = {
  __typename?: 'MutationCreateRoundSuccess';
  data: Round;
};

export type MutationCreateTeamResult = Error | MutationCreateTeamSuccess;

export type MutationCreateTeamSuccess = {
  __typename?: 'MutationCreateTeamSuccess';
  data: Team;
};

export type MutationDeleteEventResult = Error | MutationDeleteEventSuccess;

export type MutationDeleteEventSuccess = {
  __typename?: 'MutationDeleteEventSuccess';
  data: Scalars['String'];
};

export type MutationDeleteRoundResult = Error | MutationDeleteRoundSuccess;

export type MutationDeleteRoundSuccess = {
  __typename?: 'MutationDeleteRoundSuccess';
  data: Round;
};

export type MutationDeleteTeamResult = Error | MutationDeleteTeamSuccess;

export type MutationDeleteTeamSuccess = {
  __typename?: 'MutationDeleteTeamSuccess';
  data: Team;
};

export type MutationJoinTeamResult = Error | MutationJoinTeamSuccess;

export type MutationJoinTeamSuccess = {
  __typename?: 'MutationJoinTeamSuccess';
  data: TeamMember;
};

export type MutationLeaveTeamResult = Error | MutationLeaveTeamSuccess;

export type MutationLeaveTeamSuccess = {
  __typename?: 'MutationLeaveTeamSuccess';
  data: TeamMember;
};

export type MutationLoginResult = Error | MutationLoginSuccess;

export type MutationLoginSuccess = {
  __typename?: 'MutationLoginSuccess';
  data: UserLoginPayload;
};

export type MutationOrganizerAddTeamMemberResult = Error | MutationOrganizerAddTeamMemberSuccess;

export type MutationOrganizerAddTeamMemberSuccess = {
  __typename?: 'MutationOrganizerAddTeamMemberSuccess';
  data: TeamMember;
};

export type MutationOrganizerCreateTeamResult = Error | MutationOrganizerCreateTeamSuccess;

export type MutationOrganizerCreateTeamSuccess = {
  __typename?: 'MutationOrganizerCreateTeamSuccess';
  data: Team;
};

export type MutationOrganizerDeleteTeamMemberResult = Error | MutationOrganizerDeleteTeamMemberSuccess;

export type MutationOrganizerDeleteTeamMemberSuccess = {
  __typename?: 'MutationOrganizerDeleteTeamMemberSuccess';
  data: TeamMember;
};

export type MutationOrganizerDeleteTeamResult = Error | MutationOrganizerDeleteTeamSuccess;

export type MutationOrganizerDeleteTeamSuccess = {
  __typename?: 'MutationOrganizerDeleteTeamSuccess';
  data: Team;
};

export type MutationOrganizerMarkAttendanceResult = Error | MutationOrganizerMarkAttendanceSuccess;

export type MutationOrganizerMarkAttendanceSuccess = {
  __typename?: 'MutationOrganizerMarkAttendanceSuccess';
  data: Team;
};

export type MutationRefreshTokenResult = Error | MutationRefreshTokenSuccess;

export type MutationRefreshTokenSuccess = {
  __typename?: 'MutationRefreshTokenSuccess';
  data: UserLoginPayload;
};

export type MutationRegisterSoloEventResult = Error | MutationRegisterSoloEventSuccess;

export type MutationRegisterSoloEventSuccess = {
  __typename?: 'MutationRegisterSoloEventSuccess';
  data: Team;
};

export type MutationRemoveOrganizerResult = Error | MutationRemoveOrganizerSuccess;

export type MutationRemoveOrganizerSuccess = {
  __typename?: 'MutationRemoveOrganizerSuccess';
  data: Scalars['String'];
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

export type MutationUpdateEventResult = Error | MutationUpdateEventSuccess;

export type MutationUpdateEventSuccess = {
  __typename?: 'MutationUpdateEventSuccess';
  data: Event;
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
  user: User;
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
  eventByOrganizer: Array<Event>;
  events: QueryEventsConnection;
  eventsByBranchRep: Array<Event>;
  getBranch: Branch;
  getBranches: Array<Branch>;
  me: QueryMeResult;
  rounds: Array<Round>;
  userById: QueryUserByIdResult;
  users: QueryUsersConnection;
};


export type QueryEventByOrganizerArgs = {
  organizerId: Scalars['ID'];
};


export type QueryEventsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  contains?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryEventsByBranchRepArgs = {
  branchRepId: Scalars['ID'];
};


export type QueryGetBranchArgs = {
  id: Scalars['ID'];
};


export type QueryUserByIdArgs = {
  id: Scalars['ID'];
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

export type QueryUserByIdResult = Error | QueryUserByIdSuccess;

export type QueryUserByIdSuccess = {
  __typename?: 'QueryUserByIdSuccess';
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

export type Round = {
  __typename?: 'Round';
  completed: Scalars['Boolean'];
  event: Event;
  eventId: Scalars['ID'];
  roundNo: Scalars['Int'];
  teams: Array<Team>;
};

export type Team = {
  __typename?: 'Team';
  attended: Scalars['Boolean'];
  confirmed: Scalars['Boolean'];
  event: Event;
  id: Scalars['ID'];
  members: Array<TeamMember>;
  name: Scalars['String'];
  rounds: Round;
};

export type TeamMember = {
  __typename?: 'TeamMember';
  team: Team;
  user: User;
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

export type AddOrganizerMutationVariables = Exact<{
  eventId: Scalars['ID'];
  userId: Scalars['ID'];
}>;


export type AddOrganizerMutation = { __typename?: 'Mutation', addOrganizer: { __typename: 'Error', message: string } | { __typename: 'MutationAddOrganizerSuccess' } };

export type CreateEventMutationVariables = Exact<{
  eventType: EventType;
  name: Scalars['String'];
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent: { __typename: 'Error', message: string } | { __typename: 'MutationCreateEventSuccess' } };

export type DeleteEventMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteEventMutation = { __typename?: 'Mutation', deleteEvent: { __typename: 'Error', message: string } | { __typename: 'MutationDeleteEventSuccess', data: string } };

export type EmailVerificationMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type EmailVerificationMutation = { __typename?: 'Mutation', sendEmailVerification: { __typename: 'Error', message: string } | { __typename: 'MutationSendEmailVerificationSuccess', data: string } };

export type FestRegPaymentOrderMutationVariables = Exact<{ [key: string]: never; }>;


export type FestRegPaymentOrderMutation = { __typename?: 'Mutation', createPaymentOrder: { __typename: 'Error', message: string } | { __typename: 'MutationCreatePaymentOrderSuccess', data: { __typename?: 'PaymentOrder', amount: number, orderId: string, status: string, user: { __typename?: 'User', email: string, name: string } } } };

export type RefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename: 'Error', message: string } | { __typename: 'MutationRefreshTokenSuccess', data: { __typename?: 'UserLoginPayload', accessToken: string, refreshToken: string } } };

export type RemoveOrganizerMutationVariables = Exact<{
  eventId: Scalars['ID'];
  userId: Scalars['ID'];
}>;


export type RemoveOrganizerMutation = { __typename?: 'Mutation', removeOrganizer: { __typename: 'Error', message: string } | { __typename: 'MutationRemoveOrganizerSuccess', data: string } };

export type ResetPasswordMutationVariables = Exact<{
  password: Scalars['String'];
  token: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename: 'Error', message: string } | { __typename: 'MutationResetPasswordSuccess' } };

export type ResetPasswordEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ResetPasswordEmailMutation = { __typename?: 'Mutation', sendPasswordResetEmail: { __typename: 'Error', message: string } | { __typename: 'MutationSendPasswordResetEmailSuccess', data: string } };

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

export type VerifyEmailMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail: { __typename: 'Error', message: string } | { __typename: 'MutationVerifyEmailSuccess' } };

export type EventsByBranchRepQueryVariables = Exact<{
  branchRepId: Scalars['ID'];
}>;


export type EventsByBranchRepQuery = { __typename?: 'Query', eventsByBranchRep: Array<{ __typename?: 'Event', description?: string | null, eventDate?: any | null, eventType: string, id: string, fees: number, image?: string | null, name: string, venue?: string | null, published: boolean, branch: { __typename?: 'Branch', id: string, name: string }, organizers: Array<{ __typename?: 'Organizer', user: { __typename?: 'User', name: string, id: string, email: string } }> }> };

export type EventByOrganizerQueryVariables = Exact<{
  organizerId: Scalars['ID'];
}>;


export type EventByOrganizerQuery = { __typename?: 'Query', eventByOrganizer: Array<{ __typename?: 'Event', description?: string | null, eventDate?: any | null, eventType: string, fees: number, id: string, image?: string | null, maxTeamSize: number, maxTeams?: number | null, minTeamSize: number, name: string, published: boolean, venue?: string | null, rounds: Array<{ __typename?: 'Round', completed: boolean, roundNo: number, eventId: string }>, organizers: Array<{ __typename?: 'Organizer', user: { __typename?: 'User', email: string, name: string, id: string } }>, branch: { __typename?: 'Branch', id: string, name: string } }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename: 'Error', message: string } | { __typename: 'QueryMeSuccess', data: { __typename?: 'User', createdAt: any, email: string, id: string, isVerified: boolean, name: string, role: string } } };

export type SearchUsersQueryVariables = Exact<{
  contains?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
}>;


export type SearchUsersQuery = { __typename?: 'Query', users: { __typename?: 'QueryUsersConnection', pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean }, edges: Array<{ __typename?: 'QueryUsersConnectionEdge', cursor: string, node: { __typename?: 'User', id: string, name: string, role: string, email: string } } | null> } };


export const AddOrganizerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddOrganizer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addOrganizer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationAddOrganizerSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<AddOrganizerMutation, AddOrganizerMutationVariables>;
export const CreateEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eventType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventType"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationCreateEventSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<CreateEventMutation, CreateEventMutationVariables>;
export const DeleteEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationDeleteEventSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteEventMutation, DeleteEventMutationVariables>;
export const EmailVerificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EmailVerification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendEmailVerification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationSendEmailVerificationSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<EmailVerificationMutation, EmailVerificationMutationVariables>;
export const FestRegPaymentOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FestRegPaymentOrder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPaymentOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"EnumValue","value":"FEST_REGISTRATION"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationCreatePaymentOrderSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<FestRegPaymentOrderMutation, FestRegPaymentOrderMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"refreshToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationRefreshTokenSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const RemoveOrganizerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveOrganizer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeOrganizer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationRemoveOrganizerSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveOrganizerMutation, RemoveOrganizerMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationResetPasswordSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const ResetPasswordEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPasswordEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendPasswordResetEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationSendPasswordResetEmailSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]}}]} as unknown as DocumentNode<ResetPasswordEmailMutation, ResetPasswordEmailMutationVariables>;
export const SignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationLoginSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationSignUpSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export const VerifyEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MutationVerifyEmailSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]} as unknown as DocumentNode<VerifyEmailMutation, VerifyEmailMutationVariables>;
export const EventsByBranchRepDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EventsByBranchRep"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"branchRepId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventsByBranchRep"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"branchRepId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"branchRepId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"branch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"eventDate"}},{"kind":"Field","name":{"kind":"Name","value":"eventType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fees"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"venue"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"organizers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}}]} as unknown as DocumentNode<EventsByBranchRepQuery, EventsByBranchRepQueryVariables>;
export const EventByOrganizerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EventByOrganizer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventByOrganizer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"organizerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rounds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"roundNo"}},{"kind":"Field","name":{"kind":"Name","value":"eventId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"eventDate"}},{"kind":"Field","name":{"kind":"Name","value":"eventType"}},{"kind":"Field","name":{"kind":"Name","value":"fees"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"maxTeamSize"}},{"kind":"Field","name":{"kind":"Name","value":"maxTeams"}},{"kind":"Field","name":{"kind":"Name","value":"minTeamSize"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"organizers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"branch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"venue"}}]}}]}}]} as unknown as DocumentNode<EventByOrganizerQuery, EventByOrganizerQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Error"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueryMeSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const SearchUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contains"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"contains"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contains"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SearchUsersQuery, SearchUsersQueryVariables>;