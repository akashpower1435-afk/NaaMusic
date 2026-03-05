import axios from "axios";

const axios01 = axios.create({
    baseURL: "http://localhost:2855", // backend port
    headers: {
        "Content-Type": "application/json",
    },
});

export default axios01;