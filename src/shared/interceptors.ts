import axios from "axios";
import { Constants } from "./constants";

export const axiosInstance = axios.create({
  baseURL: Constants.API_BASE_URL,
});

axiosInstance.interceptors.response.use(
  (res) => {
    const { data } = res;
    if (data && data.success) {
      return res;
    } else {
      return Promise.reject(res);
    }
  },
  (error) => {
    const { response } = error;
    if (response && response.status === 401) {
      localStorage.removeItem(Constants.LocalStorageSessionKey);
    }
    return Promise.reject(error);
  }
);
