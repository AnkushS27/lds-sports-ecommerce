import { NextRequest, NextResponse } from 'next/server';
import { updateUser, getUser } from '@/db/db_connections/user';
import { UserType } from '@/TypeInterfaces/TypeInterfaces';

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const requestBody = await req.json();
        console.log('Request Body:', requestBody);
        const { email, username, phone, addresses } = requestBody;
        console.log('Username in Request Body:', username);

        if (!email || !username || !phone || !addresses) {
            return new NextResponse(
                JSON.stringify({ error: 'Email, username, phone, addresses are required' }),
                {
                    status: 400, // Bad Request
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        }
        
        // Update the user data in the database
        const updatedUserData = await updateUser(email, {username, phone, addresses} as UserType);
        console.log('Updated User Data:', updatedUserData);

        return new NextResponse(JSON.stringify(updatedUserData), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error updating user data:', error);

        return new NextResponse(
            JSON.stringify({ error: 'Error updating user data' }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }
}
