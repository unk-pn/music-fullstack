export const SERVER_BACKEND_URL = "http://backend:5500";
export const CLIENT_BACKEND_URL = "http://localhost:5500";

export const BACKEND_URL =
  typeof window === "undefined" ? SERVER_BACKEND_URL : CLIENT_BACKEND_URL;
