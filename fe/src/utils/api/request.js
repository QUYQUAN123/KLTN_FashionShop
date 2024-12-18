import axios from "axios";
let baseURL;

if (process.env.NODE_ENV === "production") {
  baseURL = "https://be-wedsite-ban-qu-n-ao.onrender.com";
} else {
  baseURL = "http://localhost:8000";
}

export const request = axios.create({
  baseURL,
});
