import { auth, signOut } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest, res: NextResponse) {
    // const { email } = await req.json();

    // console.log(`logging out user with email ${email}`);

    const resp = await signOut({redirect: false, redirectTo: '/'});
    const session = await auth();
    console.log(resp);
    console.log(session);
    return Response.json({message:'success'});
}