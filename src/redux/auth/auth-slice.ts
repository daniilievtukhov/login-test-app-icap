import { Credentials } from "@/service/credentials";
import { createSlice } from "@reduxjs/toolkit";
import * as authOperations from "./auth-operations";

export interface AuthState {
    username: string;
    isLoggedIn: boolean;
    isLoggingIn: boolean;
    isRefreshing: boolean;
    hasLoginError: boolean;
}

const initialState: AuthState = {
    username: "",
    isLoggedIn: false,
    isLoggingIn: false,
    isRefreshing: false,
    hasLoginError: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: {
        [authOperations.login.pending.toString()]: (state: AuthState) => {
            state.isLoggingIn = true;
            state.hasLoginError = false;
        },
        [authOperations.login.fulfilled.toString()]: (
            state: AuthState,
            { payload }: { payload: Credentials }
        ) => {
            state.username = payload.username;
            state.isLoggedIn = true;
            state.isLoggingIn = false;
        },
        [authOperations.login.rejected.toString()]: (state: AuthState) => {
            state.isLoggingIn = false;
            state.hasLoginError = true;
        },
    },
});

export default authSlice.reducer;
