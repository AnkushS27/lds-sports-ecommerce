import { NextRequest, NextResponse } from 'next/server';
import UserModel from '@/db/models/userModel';
import { ConnectDatabase } from '@/db/db_connections/Connector';

export async function POST(req: NextRequest) {
    try {
        await ConnectDatabase(); // Connect to MongoDB
        const requestBody = await req.json();
        const {userId} = requestBody;
        const email = userId;
        
        if (!email) {
            return new NextResponse(JSON.stringify({ error: 'Email is required' }), {
                status: 400, // Bad Request
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Query the database to find the user by email
        const user = await UserModel.findOne({ email });
        
        // Check if user exists and has addresses
        if (!user || !user.addresses || user.addresses.length === 0) {
            return new NextResponse(JSON.stringify({ error: 'User not found or has no addresses' }), {status: 404});
        }

        // Return the user's addresses
        return new NextResponse(JSON.stringify(user.addresses), {status: 200});
    } catch (error) {
        // Handle errors
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {status: 500});
    }
}
