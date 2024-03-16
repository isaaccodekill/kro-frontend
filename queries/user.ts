import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../api/user";

export const useGetProfile = ()=> {
    const result = useQuery({
     queryKey: ["getProfile"], queryFn: getUserProfile,
    })

    return result;

}