import { auth, signOut } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest, res: NextResponse) {
    // const { email } = await req.json();

    // console.log(`logging out user with email ${email}`);
    const session = await auth();

    if (session)  await signOut({redirect: false, redirectTo: '/'});
    else {console.log('No Session detected.');}
    return Response.json({message:'success'});
}