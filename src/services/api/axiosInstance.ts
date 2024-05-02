import axios from "axios";
import { API_URI } from "./API";

export const axiosInstance = axios.create({ baseURL: API_URI, timeout: 10000 })