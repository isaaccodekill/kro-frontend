import { Card, Tag } from 'antd';

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
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12">
        <h1 className="text-4xl font-bold">View Transactions</h1>
        <div className="flex flex-col gap-5 items-center w-full mt-10">
            {false ? <LoadingState /> :
                <Card style={ { width: "100%" }} bordered>
                    <p> <span className="font-bold capitalize"> amount: </span> 12000.00 </p>
                    <p> <span className="font-bold capitalize"> date: </span> 2021-09-01 </p>
                    <p> <span className="font-bold capitalize"> type: </span>
                        <Tag color="red">widthdrawal</Tag>
                        <Tag color="green">Deposit</Tag>
                    </p>
                    <p> <span className="font-bold capitalize"> Payment method: </span> Bank </p>
                </Card>}
        </div>
    </main>
  );
}
