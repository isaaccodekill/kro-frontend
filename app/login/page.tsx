'use client';

import { Input, Button, Form, type FormProps } from "antd";

type FieldTypes = {
    email: string;
    password: string;
}
export default function Page() {

const onFinish = (values: FieldTypes) => {
    console.log("Success:", values);
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
                <Button type="primary" htmlType="submit" className="w-full">
                    Log in
                </Button>
            </Form.Item>
        </Form>
        </main>
    );
}