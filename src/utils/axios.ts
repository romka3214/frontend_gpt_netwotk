import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import Token from "@/utils/auth/Token";

function successNotify(message: string): void {
  console.log("Успешный ответ от сервера - " + message);
  window.$message.success(message);
}

function errorNotify(message: string): void {
  console.log("Беда, беда, ошибочка. Ответ сервера - " + message);
  window.$message.error(message);
}

const instance: AxiosInstance = axios.create();
const domain = "https://dummyjson.com";
instance.defaults.baseURL = domain;
instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = new Token().getToken();
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  // config.headers["Access-Control-Expose-Headers"] = "error";
  return config;
});
instance.interceptors.response.use(
  (response) => {
    if (response.data.message) {
      successNotify(response.data.message);
    }
    return response;
  },
  (error) => {
    const { status } = error.response;

    if (status >= 500 || status === 400) {
      errorNotify(error.response.data.message || "unknown_error");
    }

    if (status === 401) {
      errorNotify(error.response.data.message || "auth_error");
      new Token().remove();
      if (window.location.pathname !== "/login")
        window.location.replace("/login");
    }

    if (status === 403) {
      errorNotify("forbidden");
    }

    if (status === 404) {
      errorNotify("not_found");
    }

    if (status === 419) {
      errorNotify("csrf_error");
    }

    if (status === 422) {
      errorNotify("validation_error");
    }

    if (status === 429) {
      errorNotify("throttle_error");
    }

    if (status === 453) {
      errorNotify("verify_throttle_error");
    }

    return Promise.reject(error);
  }
);

export default instance;
