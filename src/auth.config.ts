// import NextAuth from 'next-auth'

// export const {
//     handlers : { GET, POST },
//     auth,
// } = NextAuth({
//     providers:[],
// });

import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log(`From authorizer: ${auth}`)
      const isLoggedIn = !!auth?.user;
      const isOnOrders = nextUrl.pathname.startsWith('/orders');
      if (isOnOrders) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/orders', nextUrl));
      }
      return true;
    },
  },
  providers: [
    
  ], // Add providers with an empty array for now
} satisfies NextAuthConfig;