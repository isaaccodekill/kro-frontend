import {request} from "@/api/index";

export const getUserProfile = async () => {
    return await request({
        url: "/user/profile",
        method: "GET",
    })
}

type LoginDataType = {
    email: string
    password: string
}

export const login = async (data: LoginDataType) => {
    // make post api request sending along the json body
    await request({
        url: "/auth/login",
        method: "POST",
        data: JSON.stringify({
            password: data.password,
            email: data.email
        })
    })
}

type SignUpDataType = {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export const signup = async (signUpData: SignUpDataType) => {
    await request({
        url: "/auth/register",
        method: "POST",
        data: JSON.stringify({
            first_name: signUpData.firstName,
            last_name: signUpData.lastName,
            email: signUpData.email,
            password: signUpData.password
        })
    })
}


export const logout = async () => {
    await request({
        url: "/auth/logout",
        method: "POST",
    })
}