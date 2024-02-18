import NextAuth from "next-auth"
import credentials, { CredentialsProviderType, CredentialsConfig, CredentialInput } from "next-auth/providers/credentials";

let some : Credential;
const handler = NextAuth({
    providers : [
    ]
})

export { handler as GET, handler as POST }