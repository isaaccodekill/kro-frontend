import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../api/transactions";

export const useGetTransactions = ()=> {
    const result = useQuery({
        queryKey: ["getTransactions"], queryFn: getTransactions,
    })
    return result;
}