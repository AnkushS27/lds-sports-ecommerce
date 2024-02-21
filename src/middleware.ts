import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

// export default  NextAuth(authConfig).auth;  // To handle the callbacks in the auth.config.ts


const  { auth } = NextAuth(authConfig);

import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = ["*"]

const loginReqPages = ['/orders', '/profile', '/cart', '/favourites'];
const authPages = ['/login', '/signin', '/signup'];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isLoginRequired = loginReqPages.includes(nextUrl.pathname);
  const isAuthPage = authPages.includes(nextUrl.pathname);

  if (isLoginRequired) {
    if (!isLoggedIn) return Response.redirect(new URL('/login', nextUrl));
  }
  // if (isLoggedIn && isAuthPage) return false;
  // retrieve the current response
  const res = NextResponse.next()
  
  // retrieve the HTTP "Origin" header 
  // from the incoming request
  const origin = req.headers.get("origin");

  // if the origin is an allowed one,
  // add it to the 'Access-Control-Allow-Origin' header
  if (origin && (allowedOrigins.includes("*") || allowedOrigins.includes(origin))) {
    res.headers.append('Access-Control-Allow-Origin', origin);
  } else {return res;}

  // add the remaining CORS headers to the response
  res.headers.append('Access-Control-Allow-Credentials', "true")
  res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
  res.headers.append(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  return res;
})

   

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};