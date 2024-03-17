import axios from 'axios'
import {request} from "@/api/index";

export const getTransactions = async () => {
    const response = await request({
        url: "/transactions/all",
        method: "GET",
    })
    return response
}

export const createTransactions = async () => {
    const response = await request({
        url: "/transactions/generate",
        method: "POST",
    })
    return response
}