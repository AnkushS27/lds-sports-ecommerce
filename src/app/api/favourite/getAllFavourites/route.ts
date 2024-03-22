import FavouriteModel from '@/db/models/favouritesModel';
import { ConnectDatabase } from '@/db/db_connections/Connector';
import { NextResponse, NextRequest } from 'next/server';
import ProductModel from '@/db/models/productModel';

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const { userId } = requestBody;

        await ConnectDatabase(); // Connect to MongoDB

        if (!userId) {
            return new NextResponse("User ID is required.", { status: 400 });
        }

        const userFavorites = await FavouriteModel.findOne({ userId });

        if (!userFavorites) {
            return new NextResponse("User's favorites not found.", { status: 404 });
        }

        const productIds = userFavorites.products;

        const data = await ProductModel.find({ productId: { $in: productIds } });

        return new NextResponse(JSON.stringify(data), { status: 200 });
    } catch (error) {
        return new NextResponse("Error fetching data from the database. Please try again later." + error, { status: 500 });
    }
}