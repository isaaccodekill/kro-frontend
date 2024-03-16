import axios from 'axios'
import {request} from "@/api/index";

export const getTransactions = async () => {
    await request({
        url: "/transactions",
        method: "GET",
    })
}