import { Input, Button } from "antd";

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col items-center p-24">
        <h1 className="text-4xl font-bold">Sign up</h1>
        <form className="flex flex-col items-center justify-between">

            <Input
            type="text"
            size={"large"}
            placeholder="First name"
            />
            <Input
            type="text"
            size={"large"}
            placeholder="Last name"
            />
            <Input
            type="email"
            size={"large"}
            placeholder="Email"
            />
            <Input
            type="password"
            size={"large"}
            placeholder="Password"
            />
            <Button type="primary"
            className="w-full"
                    size={"large"}
            >
            Sign up
            </Button>
        </form>
        </main>
    );
}