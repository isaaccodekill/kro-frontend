
import { Input, Button } from "antd";
export default function Page() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-4xl font-bold">Login</h1>
        <form className="flex flex-col items-center justify-between p-24">
            <Input
                size={"large"}
            type="email"
            placeholder="Email"
            />
            <Input
                size={"large"}
            type="password"
            placeholder="Password"
            />
            <Button type="primary"
            className="w-full"
                    size={"large"}
            >
            Login
            </Button>
        </form>
        </main>
    );
}