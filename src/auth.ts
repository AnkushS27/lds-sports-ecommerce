import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { User } from 'next-auth';
import { getUser } from './db/db_connections/user';
 
async function getUserInfo(email: string): Promise<User | undefined> {
  const res = await getUser(email);
  if (res) {return {email:res.email, id: res.id};}
}

export const { handlers : { GET, POST}, auth, signIn, signOut, update } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
          const parsedCredentials = credentials;
          if (parsedCredentials) {
            const user = await getUserInfo(parsedCredentials['email'] as string);
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