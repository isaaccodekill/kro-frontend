import { cache } from "react";
import {QueryClient, QueryKey} from "@tanstack/query-core";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

// @ts-ignore
export const useGetRequest = (key: QueryKey, fn, options) => {
    return useQuery({
        queryKey: key,
        queryFn: fn,
        ...options
    });
}


type MutationFunctionType<TData, TVariables> = (variables: TVariables) => Promise<TData>;

// @ts-ignore
export const usePostRequest = <TData, TVariables, TError = unknown> (fn: MutationFunctionType<TData, TVariables>, successFn, errorFn, options): UseMutationResult<TData, TError, TVariables> => {
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