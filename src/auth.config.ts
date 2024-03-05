import type { NextAuthConfig } from 'next-auth';
import { getUser } from './db/db_connections/user';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: {nextUrl} }) {return true;},
    async session(params) {
        const session = params.session;
        // Fetch user data from the database based on the user ID in the session
        // if (session.user?.email) {
        //   const userData = await getUser(session.user?.email as string);
        //   // Add the profileCompletion status to the session
        //   // session.user.profileCompletion = userData.profileCompletion;
        // }


        return session;
    },
  },
  providers: [
    
  ], // Add providers with an empty array for now
} satisfies NextAuthConfig;