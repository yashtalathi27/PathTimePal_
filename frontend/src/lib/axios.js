import axios from "axios";

export const axiosinstance = axios.create({
  baseURL: "http://localhost:8001/api",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});