"use server"
import { NextResponse } from "next/server";

////////////// Checks whether user is loggedIn or not /////////////////
// ////////////// Checks whether user is loggedIn or not /////////////////
export async function GET(req: Request) {
    let user = true; // Replace with actual user login check
    let data = {};
    if (user) {
        data = {
            result: "success",
            user: "Abc",
            loggedIn: true,
        };
    } else {
        data = { result: "failure", loggedIn: false };
    }
    return NextResponse.json(data);
}


///////////////////////////////////
// Works
/*
1. No user searching in db
*/