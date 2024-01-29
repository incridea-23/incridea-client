import { useQuery } from "@apollo/client";
import { MeDocument } from "../generated/generated";
export enum AuthStatus {
  LOADING = "loading",
  NOT_AUTHENTICATED = "unauthenticated",
  AUTHENTICATED = "authenticated",
}

export const useAuth = () => {
  const { data, loading, error } = useQuery(MeDocument, {
    fetchPolicy: "cache-and-network",
  });
  if (loading) {
    return { status: AuthStatus.LOADING, loading, error };
  }
  if (data?.me.__typename === "QueryMeSuccess") {
    return {
      user: data?.me.data,
      loading,
      error,
      status: AuthStatus.AUTHENTICATED,
    };
  }
  return { user: null, loading, error, status: AuthStatus.NOT_AUTHENTICATED };
};
