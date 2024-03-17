// context/AuthContext.jsx
'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext<
    {
        isAuthenticated: boolean;
        hasCheckedAuth: boolean;
        user: UserDataType | null;
        login: (userData: UserDataType) => void;
        logout: () => void;
    }
>({
    isAuthenticated: false,
    hasCheckedAuth: false,
    user: null,
    login: () => {},
    logout: () => {},
});

type UserDataType = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
}
export const AuthProvider = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [hasCheckedAuth, setHasCheckedAuth] = useState<boolean>(false);
    const [user, setUser] = useState< UserDataType | null>(null);
    const router = useRouter();


    const login = (userData : UserDataType) => {
        setIsAuthenticated(true);
        setUser(userData);
        setHasCheckedAuth(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        setHasCheckedAuth(true);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, hasCheckedAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
