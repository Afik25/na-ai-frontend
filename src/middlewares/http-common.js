import axios from "axios";
import {SERVER_URL} from "../routes/index"

const BASE_URL = `${SERVER_URL}/api/v1`;

export default axios.create({ baseURL: BASE_URL });
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
