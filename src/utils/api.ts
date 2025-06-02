import axios from "axios";
import Auth from "./auth";

export const base_url = import.meta.env.VITE_APP_BASE_URL;

const Api = axios.create({
  baseURL: base_url,
});

Api.interceptors.request.use(
  (config) => {
    const noAuthEndpoints = [
      "/accounts:signUp",
      "/accounts:signInWithPassword",
    ];

    const shouldSkipAuth = noAuthEndpoints.some((endpoint) =>
      config.url?.includes(endpoint)
    );

    if (!shouldSkipAuth) {
      const token = Auth.getToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default Api;
