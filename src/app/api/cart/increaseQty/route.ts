import CartModel from '@/db/models/cartModel';
import { ConnectDatabase } from '@/db/db_connections/Connector';
import { NextResponse, NextRequest } from 'next/server';
import { CartType } from '@/TypeInterfaces/TypeInterfaces';

interface IRequestBody {
    productId: string;
    userId: string;
    colorIdx: number;
    variationIdx: number;
}

export const POST = async (req: NextRequest) => {
    try {
        await ConnectDatabase(); // Connect to MongoDB
        const requestBody: IRequestBody = await req.json();

        const { productId, userId, colorIdx, variationIdx } = requestBody;

        // Find the cart for the user
        const cart = await CartModel.findOne({
            userId,
            'products.productId': productId,
            'products.colorIdx': colorIdx,
            'products.variationIdx': variationIdx,
        });

        if (cart) {
            // Increment the quantity of the product
            const updatedCart:CartType | null = await CartModel.findOneAndUpdate(
                {
                    userId,
                    'products.productId': productId,
                    'products.colorIdx': colorIdx,
                    'products.variationIdx': variationIdx,
                },
                {
                    $inc: { 'products.$.qty': 1 }, // Increment quantity by 1
                },
                { new: true }
            );

            return new NextResponse(
                JSON.stringify({ updatedQty: updatedCart?.products.find(p => p.productId === productId)?.qty }),
                { status: 200 }
            );
        } else {
            return new NextResponse('Product not found in cart.', { status: 404 });
        }
    } catch (error) {
        return new NextResponse('Error updating cart quantity: ' + error, { status: 500 });
    }
};