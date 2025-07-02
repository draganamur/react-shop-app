import axios, { AxiosError, AxiosInstance } from "axios";
import { API_REQUEST_TIMEOUT } from "../utils/constants";
import { StatusCode } from "../enums";
import store from "../store";
import { setHasLostInternetConnection } from "../store/slices/config-slice";
import { getAuthFromLocalStorage } from "../data/localStorage";

let axiosInstance: AxiosInstance | undefined;
export const getAxiosInstance = (): AxiosInstance => axiosInstance!;

const hasLostNetworkConnection = (
  networkConnectionHasBeenLost: boolean
): void => {
  store.dispatch(setHasLostInternetConnection(networkConnectionHasBeenLost));
};

const isNetworkError = (error: AxiosError): boolean =>
  error.message.includes("Network Error") ||
  error.message.includes(`ms exceeded`);

const initInterceptors = (): void => {
  getAxiosInstance().interceptors.request.use(
    (config) => {
      const token = getAuthFromLocalStorage().token;

      if (config.headers && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.log(`Request error: ${error}`);
      return Promise.reject(error);
    }
  );

  getAxiosInstance().interceptors.response.use(
    (response) => {
      if (store.getState().config.hasLostInternetConnection) {
        hasLostNetworkConnection(false);
      }
      return response;
    },
    (error) => {
      if (isNetworkError(error)) {
        hasLostNetworkConnection(true);
      }

      if (error.response && error.response.status === StatusCode.UNAUTHORIZED) {
        console.warn("Unauthorized!");
      }

      console.log(`Response error: ${error}`);

      return Promise.reject(error);
    }
  );
};

export const initAxios = (baseURL?: string): void => {
  if (!baseURL) {
    throw new Error(
      "BASE_URL is not defined! Please set REACT_APP_BASE_URL in your environment variables."
    );
  }
  axiosInstance = axios.create({
    baseURL: baseURL.endsWith("/") ? baseURL : baseURL.concat("/"),
    headers: {
      "Content-Type": "application/json",
    },
    timeout: API_REQUEST_TIMEOUT,
  });

  initInterceptors();
};
