// context/AuthContext.jsx
'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext<
    {
        isAuthenticated: boolean;
        user: UserDataType | null;
        login: (userData: UserDataType) => void;
        logout: () => void;
    }
>({
    isAuthenticated: false,
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
    const [user, setUser] = useState< UserDataType | null>(null);
    const router = useRouter();


    const login = (userData : UserDataType) => {
        setIsAuthenticated(true);
        setUser(userData);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
