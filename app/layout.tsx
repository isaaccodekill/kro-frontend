'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {AuthProvider} from "@/app/context/auth-context";
import AuthWrapper from "@/app/Components/auth-wrapper";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });


const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <html lang="en">
        <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
         <AuthProvider>
             <AuthWrapper>
                     {children}
                </AuthWrapper>
            </AuthProvider>
        </QueryClientProvider>
        </body>
        </html>
  );
}
