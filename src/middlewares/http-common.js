import axios from "axios";

const BASE_URL = "http://192.168.1.109:8000/api/v1";

export default axios.create({ baseURL: BASE_URL });
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
