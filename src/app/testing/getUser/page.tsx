import { getUser } from "@/db/db_connections/user";

export default async function UserTesting() {
    const res = await getUser("abc@gmail.com");
    return (
        <>{JSON.stringify(res)}</>
    )
}