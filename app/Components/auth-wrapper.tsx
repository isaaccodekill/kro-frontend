'use client'
// in this auth wrapper we will check if the user is authenticated or not

// Path: kro-frontend/app/Components/AuthWrapper.jsx.ts


import {useRouter} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {getUserProfile} from "../../api/user";
import {useGetRequest} from "@/queries";
import {useAuth} from "../context/auth-context";
import React, {useEffect} from "react";

export default function AuthWrapper({ children }:  Readonly<{
    children: React.ReactNode;
}>) {

    const router = useRouter();
    const { isAuthenticated, user, login, logout } = useAuth();
    const { data, isLoading } =  useGetRequest(["user"], getUserProfile,
        { enabled: !isAuthenticated,
            // @ts-ignore
            onSuccess: (data) => login(data),
            retry: false,
            onError: () => logout()
        }
    );

    useEffect(() => {
        const isAuthPage = window.location.pathname.includes("/auth");
        if (isAuthenticated && isAuthPage) {
            router.replace("/");
        }else if (!isAuthenticated && !isAuthPage && !isLoading) {
            router.replace("/auth/login");
        }

    }, [isAuthenticated, isLoading, router])

    if (isLoading) {
        return <div>Loading...</div> // replace with lottie file
    }

    return children

}