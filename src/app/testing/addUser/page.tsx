import { addUser } from "@/db/db_connections/user";

export default function UserTesting() {
    const res = addUser('abc@gmail.com','1234')
    return(
        <>{JSON.stringify(res)}</>
    )
}