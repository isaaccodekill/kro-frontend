import axios, {AxiosRequestConfig} from "axios";

const BASE_URL = "http://localhost:8000/api/v1/";

const client = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
})

// @ts-ignore
export const request = async (options: AxiosRequestConfig<any>) => {
    const onSuccess = (response: any) => {
        return response.data;
    }

    const onError = (error: any) => {
        console.log(error.response, error.status, error.message, error)
        const errorBody = error.response || error.message;

        // if network error
        if (errorBody === undefined) {
            return Promise.reject("Network error. Please try again.");
        }

        if (errorBody.status === 500) {
            return Promise.reject("Something went wrong. Please try again.");
        }

         const errorData = errorBody.data?.detail;

        // if 401 error, logout user
        if (errorBody.status === 401) {
            // logout user
            if(!window.location.pathname.includes("/auth")) {
                window.location.href = "/auth/login";
            }
        }

        // check if error data is a string
        if (typeof errorData === "string") {
            return Promise.reject(errorData);
        }else {
            return Promise.reject("Something went wrong. Please try again.");
        }
    }

    return client(options).then(onSuccess).catch(onError);
}

