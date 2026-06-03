import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://fakestoreapi.com",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const status = error.response?.status;

        if (status === 401) {
            console.error("Unauthorized — invalid or expired token");
        } else if (status === 403) {
            console.error("Forbidden — you don't have permission");
        } else if (status === 404) {
            console.error("Resource not found");
        } else if (status >= 500) {
            console.error("Server error — please try again later");
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
