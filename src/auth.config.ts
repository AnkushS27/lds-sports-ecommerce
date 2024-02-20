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
    authorized({ auth, request }) {
      const resp = corsHandler(request);
      const nextUrl = request.nextUrl;
      const isLoggedIn = !!auth?.user;
      console.log(isLoggedIn);
      const loginReqPages = ['/orders', '/profile', '/cart', '/favourites'];
      const isLoginRequired = loginReqPages.includes(nextUrl.pathname);
      if (isLoginRequired) {
        console.log('User is inside login required pages');
        if (isLoggedIn) {
          console.log('User is also logged In');
          return true;}
        return Response.redirect(new URL('/login', nextUrl)); // Redirect unauthenticated users to login page
      }

      const authPage = nextUrl.pathname.startsWith('/login' || '/signup');
      if (authPage && isLoggedIn) return Response.redirect(new URL('/', nextUrl));
      else if (authPage) return resp;
      // const isOnOrders = nextUrl.pathname.startsWith('/orders');
      // if (isOnOrders) {
      //   if (isLoggedIn) return true;
      //   return false; // Redirect unauthenticated users to login page
      // } else if (isLoggedIn) {
      //   return Response.redirect(new URL('/orders', nextUrl));
      // }
      return true;
    },
    session(params) {
        return params.session;
    },
    redirect({ url, baseUrl}) {
      return baseUrl; // Directly re-direct any of the pages to home page at signIn and signOut
    }
  },
  providers: [
    
  ], // Add providers with an empty array for now
} satisfies NextAuthConfig;