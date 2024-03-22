import { ConnectDatabase } from '@/db/db_connections/Connector';
import FavouriteModel from '@/db/models/favouritesModel';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
    const requestBody = await req.json();
    const { productId, userId } = requestBody;
    console.log('Request Body:', requestBody);

    await ConnectDatabase(); // Connect to MongoDB

    try {
        // Add productId to user's favorites
        const updatedFavorites = await FavouriteModel.updateOne(
            { userId },
            { $addToSet: { products: productId } }, // Add productId if not already present
            { new: true, upsert: true }
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
