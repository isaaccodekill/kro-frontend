'use client';

import { Input, Button, Form, type FormProps, notification } from "antd";
import {usePostRequest} from "@/queries";
import {useAuth} from "@/app/context/auth-context";
import { login as loginApi } from "@/api/user";
import Link from "next/link";

type FieldTypes = {
    email: string;
    password: string;
}

const openNotificationWithIcon = (type: "success" | "error", title: string, message: string) => {
    notification[type]({
        message: title,
        description: message,
        placement: "bottomRight",
        duration: 5
    });
};
export default function Page() {

    const { login } = useAuth();

    const onSuccess = (data: any) => {
        login(data);
    }

    const onError = (error: any) => {
        console.log(error.detail, error.message, error);
        openNotificationWithIcon("error", "Error", error);
        // show error message in toast
    }

    const { mutate, isPending } =  usePostRequest((data: FieldTypes) => loginApi(data), onSuccess, onError, { retry: false });



const onFinish = (values: FieldTypes) => {
    mutate(values);
}

const onFinishFailed = (errorInfo: FormProps<FieldTypes>) => {
    console.log("Failed:", errorInfo);
}

const initialValues = {
    email: "",
    password: ""
}

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
        <h1 className="text-4xl font-bold">Login</h1>
        <Form name="basic" layout="vertical" initialValues={initialValues} onFinish={onFinish} className="mt-10 w-full" style={{ maxWidth: 400 }}>
            <Form.Item<FieldTypes>
                label="Email"
                name="email"
                className="flex flex-col"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input
                    type="email"
                    size={"large"}
                    placeholder="Email"
                />
            </Form.Item>
            <Form.Item<FieldTypes>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input
                    type="password"
                    size={"large"}
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" loading={isPending} htmlType="submit" className="w-full">
                    Log in
                </Button>
            </Form.Item>
            <div className="flex justify-center">
                <Link href="/auth/signup">Sign up</Link>
            </div>
        </Form>
        </main>
    );
}