import { CoreState } from "../store";

export const getUser = (state: CoreState) => state.auth.username;
export const getIsLoggedIn = (state: CoreState) => state.auth.isLoggedIn;
export const getIsLoggingIn = (state: CoreState) => state.auth.isLoggingIn;
export const getIsRefreshing = (state: CoreState) => state.auth.isRefreshing;
export const getHasLoginError = (state: CoreState) => state.auth.hasLoginError;
