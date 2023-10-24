import axios from "axios";
import { Credentials } from "./credentials";

const BASE_URL = "https://technical-task-api.icapgroupgmbh.com/api/";

axios.defaults.baseURL = BASE_URL;

export const authHeader = {
    set: (token: string) => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    unset: () => {
        axios.defaults.headers.common["Authorization"] = "";
    },
};

export const login = (credentials: Credentials) => {
    return axios.post<Credentials>("login/", credentials);
};

export const getTable = () => {
    return axios.get("table/");
};
export const getTableId = (id: number) => {
    return axios.get(`table/${id}`);
};

export const deleteTableId = (id: number) => {
    return axios.delete(`table/${id}`);
};

export const updateTableId = (id: number, editedUser: any) => {
    return axios.patch(`table/${id}/`, editedUser);
};
