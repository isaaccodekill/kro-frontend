export const getTransactions = async () => {
    const response = await fetch("url/transactions", {
        headers: {
            "Content-type": "Application/json"
        },
    })

    return await response.json();
}