import axios, {AxiosRequestConfig} from "axios";

const BASE_URL = "http://localhost:3000";

const client = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

// @ts-ignore
export const request = async (options: AxiosRequestConfig<any>) => {
    const onSuccess = (response: any) => {
        return response.data.data;
    }

    const onError = (error: any) => {
        console.log(error);
        return Promise.reject(error.response || error.message);
    }

    return client(options).then(onSuccess).catch(onError);
}

