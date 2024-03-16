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
        return response.data.data;
    }

    const onError = (error: any) => {

        const errorBody = error.response || error.message;
        console.log(errorBody)
        const errorData = errorBody.data.detail;

        // check if error data is a string
        if (typeof errorData === "string") {
            return Promise.reject(errorData);
        }else {
            return Promise.reject("Something went wrong. Please try again.");
        }
    }

    return client(options).then(onSuccess).catch(onError);
}

