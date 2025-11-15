import axios from "axios";
import { useUserStore } from "@/stores/user-store";
import { toast } from "sonner"

export const PublicApiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const PrivateApiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

PrivateApiClient.interceptors.request.use(
    (config) => {
        const token = useUserStore.getState().token;
        if (token) {
            config.headers!.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        toast.error("Error occured in request interceptor")
        return Promise.reject(error);
    }
);

PrivateApiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const res = error.response;
        toast.error(res?.data?.message || error.message || "Error occured in response interceptor")
        if (res?.status === 401) {
            useUserStore.getState().clearUserInfo();
        }
        return Promise.reject(error);
    }
);