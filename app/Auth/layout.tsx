'use client'
import useGetAuth  from '../hooks/useGetAuth'
import Redirect from ''

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    const authed = useGetAuth()

    if(authed){
        return <Redirect  />
    }

    return (
        <>
            { authed ?  : children}
        </>
    )
}