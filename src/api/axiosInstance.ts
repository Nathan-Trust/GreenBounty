import axios, {
  AxiosError,
  AxiosHeaders,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";
import { decrypt } from "@/services/encryption";
import { logger } from "@/utils/logger";
import { Green_Bounty_Routes } from "@/store/route";

// Retrieve baseURL from environment variable in Vite
const baseURL = import.meta.env.VITE_API_BASE_URL;

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: baseURL,
});

// Optional: Add an interceptor to include authorization token in requests
axiosInstance.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config: InternalAxiosRequestConfig<any>) => {
    const token = Cookies.get("token");
    const user = token ? decrypt(token) : null;

    if (user) {
      // Check if headers is defined, if not initialize it as an instance of AxiosHeaders
      config.headers = config.headers || new AxiosHeaders();

      // Set Authorization header
      config.headers.set("Authorization", `Bearer ${user}`);
    }

    return config; // No need to cast here, AxiosRequestConfig is compatible
  }
);

// Interceptor for handling errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error?.response?.status;
    logger("Error status:", status);

    if (status === 401 || status === 500) {
      Cookies.remove("token");
      // Handle redirection or any other custom error handling logic
      window.location.href = Green_Bounty_Routes.signIn; // Use window.location.href for redirection
    } else {
      logger("An error occurred:", error?.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
