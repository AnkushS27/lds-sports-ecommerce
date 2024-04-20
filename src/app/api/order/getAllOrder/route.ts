import OrderModel from '@/db/models/orderModel';
import { ConnectDatabase } from '@/db/db_connections/Connector';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const { userId } = requestBody;

        await ConnectDatabase(); // Connect to MongoDB

        if (!userId) {
            return new NextResponse("User ID is required.", { status: 400 });
        }

        const userOrders = await OrderModel.find({ userId }).exec();

        if (!userOrders || userOrders.length === 0) {
            return new NextResponse("User's orders not found.", { status: 404 });
        }

        return new NextResponse(JSON.stringify(userOrders), { status: 200 });
    } catch (error) {
        return new NextResponse("Error fetching data from the database. Please try again later." + error, { status: 500 });
    }
}