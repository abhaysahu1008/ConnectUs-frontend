export const BASE_URL =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:7777"
    : "/api";

export const SOCKET_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:7777"
    : "https://devzoo.in";
