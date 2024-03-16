'use client';

import {Input, Button, Form, type FormProps, notification} from "antd";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {router} from "next/client";
import {usePostRequest} from "@/queries";
import {signup} from "@/api/user";

type FieldTypes = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
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
    const  router = useRouter();
    const onSuccess = (data: any) => {
        openNotificationWithIcon("success", "Success", "You have successfully signed up");
        router.push("/auth/login");
    }

    const onError = (error: any) => {

        openNotificationWithIcon("error", "Error", error);
        // show error message in toast
    }

    const { mutate, isPending } =  usePostRequest((data: FieldTypes) => signup(data), onSuccess, onError, { retry: false });

    const onFinish = (values: FieldTypes) => {
        mutate(values);
    }

    const onFinishFailed = (errorInfo: FormProps<FieldTypes>) => {
        console.log("Failed:", errorInfo);
    }
    const initialValues = {
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    }







    return (
        <main className="flex min-h-screen flex-col items-center p-24">
        <h1 className="text-4xl font-bold">Sign up</h1>
        <Form name="basic" layout="vertical" className="mt-10 w-full" style={{ maxWidth: 400 }} initialValues={initialValues} onFinish={onFinish}>
            <Form.Item<FieldTypes>
                label="First Name"
                name="firstName"
                className="flex flex-col"
                rules={[{ required: true, message: 'Please input your firstName!' }]}
            >
                <Input
                    type="text"
                    size={"large"}
                    placeholder="First name"
                />
            </Form.Item>

            <Form.Item<FieldTypes>
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: 'Please input your lastName!' }]}
            >
                <Input
                    type="text"
                    size={"large"}
                    placeholder="Last name"
                />
            </Form.Item>

            <Form.Item<FieldTypes>
                label="Email"
                name="email"
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
                rules={[{ required: true, message: 'Please input your password!', min: 8 }]}
            >
                <Input
                    type="password"
                    size={"large"}
                    placeholder="Password"
                />
            </Form.Item>

            <Button type="primary"
                    loading={isPending}
                    htmlType="submit"
            className="w-full"
                    size={"large"}
            >
            Sign up
            </Button>
            <div className="flex justify-center mt-10">
                <Link href="/auth/login">Login</Link>
            </div>
        </Form>
        </main>
    );
}