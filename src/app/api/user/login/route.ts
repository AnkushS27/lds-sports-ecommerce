import { NextRequest, NextResponse } from 'next/server';
import { signIn } from '@/auth';

export async function POST(request: NextRequest) {
    const { email, password}:any = await request.json();
    console.log(`Data recieved in /api/login`);
    console.log({ email, password });
    const resp = await signIn('credentials',{ email, password, redirect: false });
    return Response.json({result:'success', redirectUrl : resp});
}