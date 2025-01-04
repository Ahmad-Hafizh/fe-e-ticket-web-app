import axios from 'axios';

export const basicGetApi = axios.create({
  baseURL: 'http://localhost:3125',
});
