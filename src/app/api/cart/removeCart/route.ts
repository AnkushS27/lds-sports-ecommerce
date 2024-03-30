import CartModel from '@/db/models/cartModel';
import { ConnectDatabase } from '@/db/db_connections/Connector';
import { NextResponse, NextRequest } from 'next/server';

export async function DELETE(req: NextRequest, res: NextResponse) {
    const requestBody = await req.json();
    const { productId, userId, qty} = requestBody;
    console.log('Request Body:', requestBody);

    await ConnectDatabase(); // Connect to MongoDB

    try {
        // Add productId to user's favorites
        const updatedCart = await CartModel.updateOne(
            { userId },
            { $pull: { products: { productId, qty } } }, 
        );

        return new NextResponse(JSON.stringify(updatedCart), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error updating favourites data:', error);

        return new NextResponse(
            JSON.stringify({ error: 'Error updating favourites data' }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }
}
