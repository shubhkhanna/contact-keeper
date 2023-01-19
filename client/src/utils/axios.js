import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  proxy: { host: "localhost", port: 3000 },
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
