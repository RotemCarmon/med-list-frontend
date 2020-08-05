import Axios from "axios";
import StorageService from "../services/StorageService";

const BASE_URL =
  process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging" ? "/api/" : "//localhost:4000/api/";

var axios = Axios.create({
  withCredentials: true,
});

export default {
  get(endpoint, data) {
    return ajax(endpoint, "GET", data);
  },
  post(endpoint, data) {
    return ajax(endpoint, "POST", data);
  },
  put(endpoint, data) {
    return ajax(endpoint, "PUT", data);
  },
  delete(endpoint, data) {
    return ajax(endpoint, "DELETE", data);
  }
};

async function ajax(endpoint, method = "get", data = null) {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
    });
    
    delete axios.defaults.headers.common["Authorization"];

    if (res) {
      return res.data;
    }
    return;
  } catch (err) {
    console.log("ERR " + err);
    if (err.response && err.response.data.error) {
      console.log("Server", err.response.data.error);
    }
  }
}

// appends Authorization header to send JWT
axios.interceptors.request.use(
  (response) => {
    const urlParts = response.url.split("/").map((part) => part.split("?"));
    var urls = [].concat(...urlParts);

    if (
      urls.includes("user") ||
      urls.includes("product") ||
      urls.includes("auth")
    ) {
      const token = StorageService.getStorage("access token");
      if (token) {
        response.headers["Authorization"] = "Bearer " + token;
      }
    }
    return response;
  },
  (error) => {
    Promise.reject(error);
  }
);

// AXIOS INTERCEPTOR
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url === `${BASE_URL}auth/refresh_token`
    ) {
      // In this case the refresh token is probobly not valid
      // TODO: redirect to the login page
      return Promise.reject(error);
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // get refresh token from the local storage
      const refreshToken = StorageService.getStorage("refresh token");

      // call the refresh token API to get a new access token
      const { accessToken } = await ajax("auth/refresh_token", "POST", {
        refreshToken,
      });

      if (accessToken) {
        // save new access token to local storage
       StorageService.setStorage("access token", accessToken);

        // append new access token to the original request header
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // send the original request with the axios instant
        const res = await axios(originalRequest);
        return res;
      }
    }
    return Promise.reject(error);
  }
);
