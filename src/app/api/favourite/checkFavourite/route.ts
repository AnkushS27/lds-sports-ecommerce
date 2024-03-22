import { ConnectDatabase } from '@/db/db_connections/Connector';
import { NextResponse, NextRequest } from 'next/server';
import FavouriteModel from '@/db/models/favouritesModel';

export const POST = async (req: NextRequest) => {
    try {
        await ConnectDatabase(); // Connect to MongoDB
        const requestBody = await req.json();

        const { productId, userId } = requestBody

        const favorite = await FavouriteModel.findOne({
            userId,
            products: productId,
        });

        const isFavourite = favorite ? true : false;

        return new NextResponse(JSON.stringify({ isFavourite }), { status: 200 });
    } catch (error) {
        return new NextResponse("Error checking favorite status." + error, { status: 500 });
    }
}