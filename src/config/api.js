import axios from "axios";
export const apiUrl = "https://wow-crypto.onrender.com/";
export const config = {
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
};

export const axiosInstance = axios.create(config);
