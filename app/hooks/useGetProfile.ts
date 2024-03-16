// react hook to determine if the user is logged in or not
import { useState, useEffect } from 'react';

export default function useGetProfile() {
    const [authed, setAuth] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuth(true);
        }else {
            setAuth(false);
        }
    }
    , []);

    return authed;
}