import CartModel from '@/db/models/cartModel';
import { ConnectDatabase } from '@/db/db_connections/Connector';
import { NextResponse, NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
    try {
        await ConnectDatabase(); // Connect to MongoDB
        const requestBody = await req.json();

        const { productId, userId } = requestBody

        const cart = await CartModel.findOne({
            userId,
            products: { $elemMatch: { productId } },
        });

        const isCart = cart ? true : false;

        return new NextResponse(JSON.stringify({ isCart }), { status: 200 });
    } catch (error) {
        return new NextResponse("Error checking favorite status." + error, { status: 500 });
    }
}