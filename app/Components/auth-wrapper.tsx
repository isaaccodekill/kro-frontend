'use client'
// in this auth wrapper we will check if the user is authenticated or not

// Path: kro-frontend/app/Components/AuthWrapper.jsx.ts


import {useRouter} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {getUserProfile} from "../../api/user";
import {useGetRequest} from "@/queries";
import {useAuth} from "../context/auth-context";
import { usePathname } from "next/navigation";
import React, {useEffect, useMemo} from "react";

export default function AuthWrapper({ children }:  Readonly<{
    children: React.ReactNode;
}>) {

    const pathname = usePathname();
    const router = useRouter();
    const { isAuthenticated, user, login, logout, hasCheckedAuth } = useAuth();
    const { data, isLoading, isError, isSuccess } =  useGetRequest(["user-profile"], getUserProfile,
        {
            // @ts-ignore
            retry: false,
        }
    );


    useEffect(() => {
        if (data) {
            login(data);
            router.replace("/");
        }else if (isError) {
            logout();
            router.replace("/auth/login");
        }

    }, [data, isError])


    const isOnValidPage = useMemo(() => {
        if(isAuthenticated && pathname.includes("/auth")){
            return false
        }

        if(!isAuthenticated && !pathname.includes("/auth")){
            return false
        }

        return true
    }, [isAuthenticated, pathname])

    if(isOnValidPage && !isLoading){
        return children
    }

    return  <div>{hasCheckedAuth}Loading...</div>

}