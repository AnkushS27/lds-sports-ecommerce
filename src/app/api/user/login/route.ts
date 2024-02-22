import { ConnectDatabase } from '@/db/testing';
import User from "@/db/models/userModel";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { signIn } from '@/auth';

// ConnectDatabase();

export async function POST(request: NextRequest) {
    const { email, password}:any = await request.json();
    console.log(`Data recieved in /api/login`);
    console.log({ email, password });
    const resp = await signIn('credentials',{ email, password, redirect: false });
    return Response.json({result:'success', redirectUrl : resp});
}

// export async function POST(request: NextRequest){
//     try {
//         const reqBody = await request.json()
//         const {email, password} = reqBody;
//         console.log(reqBody);

//         //check if user exists
//         const user = await User.findOne({email})
//         if(!user){
//             return NextResponse.json({error: "User does not exist"}, {status: 400})
//         }
//         console.log("user exists");
        
        
//         //check if password is correct
//         const validPassword = await bcryptjs.compare(password, user.password)
//         if(!validPassword){
//             return NextResponse.json({error: "Invalid password"}, {status: 400})
//         }
//         console.log(user);

//         return NextResponse.json({
//             message: "User loged in successfully",
//             success: true,
//             user
//         })
//     } catch (error: any){
//         return NextResponse.json({error: error.message},{status:500});
//     }
// }