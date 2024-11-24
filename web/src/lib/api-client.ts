import { env } from "@/env";
import { toast } from "sonner";
import axios from "axios";

const api = axios.create({
  baseURL: env.API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;

    toast.error("Error dikit ga ngaruh", {
      description: message,
    });

    return Promise.reject(error);
  }
);

export { api };
