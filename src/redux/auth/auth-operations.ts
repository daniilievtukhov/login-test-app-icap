import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../service";
import { Credentials } from "../../service/credentials";

export const login = createAsyncThunk(
    "auth/login",
    async (credentials: Credentials) => {
        const { data } = await API.login(credentials);

        return data;
    }
);
