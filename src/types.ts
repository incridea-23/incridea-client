import type { GetUsersQuery } from "./graphql/generated";

export type Message = GetUsersQuery["users"][0]["message"][0];
export type User = GetUsersQuery["users"][0];