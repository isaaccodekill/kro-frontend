import {request} from "@/api/index";

export const getUserProfile = async () => {
    await request({
        url: "/me",
        method: "GET",
    })
}

export const login = async (email: string, password: string) => {
    // make post api request sending along the json body
    await request({
        url: "/login",
        method: "POST",
        data: JSON.stringify({
            password,
            email
        })
    })
}


export const signup = async (firstName: string, lastName: string, email: string, password: string ) => {
    await request({
        url: "/signup",
        method: "POST",
        data: JSON.stringify({
            password,
            email,
            firstName,
            lastName,
        })
    })
}