'use client';

import { Input, Button, Form, type FormProps } from "antd";

type FieldTypes = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
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
                    htmlType="submit"
            className="w-full"
                    size={"large"}
            >
            Sign up
            </Button>
        </Form>
        </main>
    );
}