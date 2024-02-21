import { signOut } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest, res: NextResponse) {
    const { email } = await req.json();

    console.log(`logging out user with email ${email}`);

    signOut({redirect: true, redirectTo: '/'});
}