
import axios from "axios";

export const basicGetApi = axios.create({
  baseURL: "http://localhost:8080",

  // baseURL: 'https://e-ticket-webapp-minpro.vercel.app/',
});
