"use client"
import { useSession } from "next-auth/react";
// import {auth} from '@/auth'
// export default async function Testing() {
//     const session = await auth();
//     return(
//         <>
//         <h1>{JSON.stringify(session)}</h1>
//         </>
//     )

// }


export default function Testing() {
    const { data: session } = useSession();
    const getTheSession = () => {
        console.log('Loading the session');
        console.log(session);
    }
    return (
        <>
        <button onClick={() => {getTheSession()}}> Show Session </button>
        </>
    )
}