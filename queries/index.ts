import { cache } from "react";
import {QueryClient, QueryKey} from "@tanstack/query-core";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { getUserProfile, login, signup } from "../api/user";
export const queryClientConfig = {
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 1000 * 60 * 5, // 5 minutes
        },
        mutations: {
            onError: (error: any) => {
                console.error(error);
                // come back and add a toast here
            }
        }
    }
}

export const queryClient = cache(() => new QueryClient(queryClientConfig));


// @ts-ignore
export const useGetRequest = (key: QueryKey, fn, options) => {
    return useQuery({
        queryKey: key,
        queryFn: fn,
        ...options
    });
}

// @ts-ignore
export const usePostRequest = (fn, successFn, errorFn, options)=> {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: fn,
        onSuccess: (data) => {
            successFn?.(data);
            queryClient.invalidateQueries();
        },
        onError: errorFn,
        retry: 1,
        ...options
    })
}