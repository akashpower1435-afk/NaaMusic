import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:2855/api/songs",
});

export default API;
