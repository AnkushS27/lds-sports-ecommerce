import { ConnectDatabase } from '@/db/db_connections/Connector';
import FavouriteModel from '@/db/models/favouritesModel';
import { NextResponse, NextRequest } from 'next/server';
import { getSession } from 'next-auth/react';

export async function DELETE(req: NextRequest, res: NextResponse) {
    const requestBody = await req.json();
    const { productId, userId } = requestBody;

    await ConnectDatabase(); // Connect to MongoDB

    try {
        // Remove productId from user's favorites
        const updatedFavorites = await FavouriteModel.updateOne(
            { userId },
            { $pull: { products: productId } }, // Remove productId from the array
        );

        return new NextResponse(JSON.stringify(updatedFavorites), {
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