export const SERVER_BACKEND_URL = "https://music.unk-pn.ru";
export const CLIENT_BACKEND_URL = "https://music.unk-pn.ru";

export const BACKEND_URL =
  typeof window === "undefined" ? SERVER_BACKEND_URL : CLIENT_BACKEND_URL;
