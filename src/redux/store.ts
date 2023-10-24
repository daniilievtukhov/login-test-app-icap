import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer, { AuthState } from "./auth/auth-slice";

export interface CoreState {
    auth: AuthState;
}

const persistAuthConfig = {
    key: "auth",
    storage,
};

const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
    },

    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend().concat(),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
