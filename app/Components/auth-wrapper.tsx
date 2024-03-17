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

    if (!isSuccess && !isError) {
        return <div>Loading...</div> // replace with lottie file
    }

    return children

}