import { cache } from "react";

import {QueryClient} from "@tanstack/query-core";

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