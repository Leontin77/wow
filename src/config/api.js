import axios from "axios";
export const apiUrl = "http://localhost:5000";
export const config = {
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
};

export const axiosInstance = axios.create(config);
