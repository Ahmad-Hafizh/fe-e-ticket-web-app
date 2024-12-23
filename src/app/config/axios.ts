import axios from 'axios';

console.log(process.env.BACKEND_BASE_URL);

export const basicGetApi = axios.create({
  baseURL: 'https://e-ticket-webapp-minpro.vercel.app',
});
