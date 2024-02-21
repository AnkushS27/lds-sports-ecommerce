// import NextAuth from 'next-auth'

// export const {
//     handlers : { GET, POST },
//     auth,
// } = NextAuth({
//     providers:[],
// });

import type { NextAuthConfig } from 'next-auth';
import corsHandler from './corsHandler';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: {nextUrl} }) {return true;},
    session(params) {
        return params.session;
    },
  },
  providers: [
    
  ], // Add providers with an empty array for now
} satisfies NextAuthConfig;