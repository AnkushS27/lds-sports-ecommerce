import { getCsrfToken } from "next-auth/react"

export default async function Testing() {
    const csrfToken = getCsrfToken;
    console.log(csrfToken);
    return(
        <h1>Check console</h1>
    )
}