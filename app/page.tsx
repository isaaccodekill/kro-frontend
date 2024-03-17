'use client'

import {Card, notification, Tag, Alert, Empty, Button} from 'antd';
import {getTransactions} from "@/api/transactions";

import {useGetRequest, usePostRequest} from "@/queries";
import { createTransactions } from "@/api/transactions";
import {logout as logoutApi} from "@/api/user";
import {useAuth} from "@/app/context/auth-context";

const LoadingState = () => {
    return (
        <>
            <Card style={ { width: "100%" }} loading={true}  bordered>
            </Card>
            <Card style={ { width: "100%" }} loading={true}  bordered>
            </Card>
            <Card style={ { width: "100%" }} loading={true}  bordered>
            </Card>
        </>
    )
}

const errorState = (error: string) => {
    return (
        <div className="flex flex-col gap-5 items-center w-full mt-10">
            <Alert message={error} type={"error"} />
        </div>
    )
}

const openNotificationWithIcon = (type: "success" | "error", title: string, message: string) => {
    notification[type]({
        message: title,
        description: message,
        placement: "bottomRight",
        duration: 5
    });
};
export default function Home() {

    const { isAuthenticated, user, logout } = useAuth();
    const onError = (error: any) => {
        openNotificationWithIcon("error", "Error", error);
        // show error message in toast
    }

    const { mutate, isPending } =  usePostRequest(() => createTransactions(), () => {}, onError, { retry: false });

    const generateTransaction = () => {
        mutate();
    }


    const { data, isLoading, isError, error, isRefetching } = useGetRequest(["transactions"], getTransactions, {
        enabled: true,
        retry: false,

    });


    const onLogoutSuccess = () => {
        logout();
    }

    const { mutate: logoutMutation , isPending: isLogoutPending } =  usePostRequest(() => logoutApi(), onLogoutSuccess, onError, { retry: false });

    const logoutFunc = () => {
        logoutMutation();
    }




  return (
    <main className="flex min-h-screen flex-col items-center p-12">
        <div className="flex justify-end w-full">
            <Button loading={isLogoutPending} onClick={logoutFunc}>
                Logout
            </Button>
        </div>
        <h1 className="text-4xl font-bold">View Transactions</h1>
        <div className="flex flex-col gap-5 items-center w-full mt-10">
            {isError ? errorState(error) : ""}
            {isLoading || isRefetching ? <LoadingState /> : ""}
            {data && data.length === 0 ? <Empty>
                <Button onClick={generateTransaction} loading={isPending} type="primary">Create Now</Button>
            </Empty> : ""}
            {data && data.length > 0 && data.map((transaction: any, index: number) => {
                return (
                    <Card key={index} style={ { width: "100%" }} bordered>
                        <p> <span className="font-bold capitalize"> amount: </span> {transaction.amount} </p>
                        <p> <span className="font-bold capitalize"> date: </span> {transaction.timestamp} </p>
                        <p> <span className="font-bold capitalize"> type: </span>
                            <Tag color={transaction.type === "deposit" ? "green" : "red"}>{transaction.type}</Tag>
                        </p>
                        <p> <span className="font-bold capitalize"> Payment method: </span> {transaction.payment_method} </p>
                    </Card>
        )})}
        </div>
    </main>
  );
}
