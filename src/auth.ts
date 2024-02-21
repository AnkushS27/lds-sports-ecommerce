import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { User } from 'next-auth';
 
async function getUser(email: string): Promise<User | undefined> {
  console.log(`Requesting user for email ${email}`);
    return {email, id: '101',};
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // const parsedCredentials = z
        //   .object({ email: z.string().email(), password: z.string().min(6) })
        //   .safeParse(credentials);
          const parsedCredentials = credentials;
          if (parsedCredentials) {
            // const { email, password } = parsedCredentials;
            const user = await getUser(parsedCredentials['email'] as string);
            console.log(`User Extracted:${user?.email}`);
            if (!user) return null;
            return user;
          }           
          console.log('Wrong Credentials');
          return null;
      },
    }),
  ],
});