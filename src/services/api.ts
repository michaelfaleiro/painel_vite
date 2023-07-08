import axios from "axios";
import { getUserLocalStorage } from "../context/AuthProvider/util";

export const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const user = getUserLocalStorage();

    config.headers["Authorization"] = `Bearer ${user?.token}`;

    return config;
  },
  (error) => {
    return Promise.resolve(error);
  }
);
