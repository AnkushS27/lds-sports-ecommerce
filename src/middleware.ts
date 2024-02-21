import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default  NextAuth(authConfig).auth;  // To handle the callbacks in the auth.config.ts


export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};