import axios from "axios";

export const BASE_URL = "http://127.0.0.1:8000";
export const API_URL = BASE_URL + "/api";

const API = axios.create({
  baseURL: API_URL,
});

API.interceptors.request.use((request) => {

  if (request.url.endsWith("logout")){
    request.headers["authorization"] = `Bearer ${localStorage.getItem('token')}`;
  }
  request.headers["Content-Type"] = request.headers['Content-Type'] || "application/json";

  return request;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("Error", error)
    // if (error.response.status === 401) {
    //   localStorage.removeItem("token");
    // }

    return Promise.reject(error);
  }
);

export default API;
