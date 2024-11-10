import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

instance.interceptors.request.use(
  function (config) {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    if (response.status === 226) {
      localStorage.removeItem("token");
      localStorage.clear();
      window.location.replace(`/login`);
    }
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      // toast.error("Your session as expired, kindly login again");
      // localStorage.removeItem("token");
      // localStorage.clear();
      // window.location.replace(`/login`);
    }
    return Promise.reject(error);
  }
);
