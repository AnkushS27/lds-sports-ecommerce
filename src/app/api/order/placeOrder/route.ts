import orderModel from '@/db/models/orderModel';
import { ConnectDatabase } from '@/db/db_connections/Connector';
import { NextResponse, NextRequest } from 'next/server';
import { ProductType } from '@/TypeInterfaces/TypeInterfaces';

export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        const requestBody = await req.json();
        const { userId, products, variants, totalPrice } = requestBody;

        await ConnectDatabase(); // Connect to MongoDB

        // Create order items by combining product data with variants data
        const orderItems = products.map((productData:ProductType, index:number) => {
            const variantData = variants[index];
            return {
              productId: productData.productId,
              qty: variantData.qty,
              colorIdx: variantData.colorIdx,
              variationIdx: variantData.variationIdx,
            };
          });

        // Create a new order document
        const newOrder = new orderModel({
            userId,
            products: orderItems,
            totalPrice,
        });

        // Save the order to the database
        const savedOrder = await newOrder.save();

        return new NextResponse(JSON.stringify(savedOrder), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error adding to orders:', error);

        return new NextResponse(
            JSON.stringify({ error: 'Error updating orders data' }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }
}