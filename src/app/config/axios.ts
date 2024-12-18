import axios from "axios";

export const basicGetApi = axios.create({
  baseURL: "https://e-ticket-webapp-minpro.vercel.app",
});
