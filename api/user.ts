export const getUserProfile = async () => {
    const response = await fetch("url")
    return await response.json()
}

export const login = async (email: string, password: string) => {
    // make post api request sending along the json body

    const response = await fetch("url", {
        method: "POST",
        headers: {
            "Content-type": "Application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    })

    return await response.json()

}


const signup = async (firstName: string, lastName: string, email: string, password: string ) => {
    const response = await fetch("url", {
        method: "POST",
        headers: {
            "Content-type": "Application/json"
        },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            password
        })
    })

    return await response.json()
}