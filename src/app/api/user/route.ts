import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/db/db_connections/user';

export async function POST(req: NextRequest) {
    try {
        // Parse the JSON data from the request body
        const requestBody = await req.json();
        
        // Retrieve the 'email' field from the parsed JSON data
        const email = requestBody?.email;

        // Check if 'email' is present before calling getUser
        if (!email) {
            return new NextResponse(JSON.stringify({ error: 'Email is required' }), {
                status: 400, // Bad Request
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Call the getUser function with the email parameter
        const user = await getUser(email);

        // Return the user data
        return new NextResponse(JSON.stringify(user), {
            status: 200, // OK
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        // Handle parsing errors
        return new NextResponse(JSON.stringify({ error: 'Error parsing the request body' }), {
            status: 500, // Internal Server Error
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
