import CartModel from '@/db/models/cartModel';
import { ConnectDatabase } from '@/db/db_connections/Connector';
import { NextResponse, NextRequest } from 'next/server';
import ProductModel from '@/db/models/productModel';

export async function POST(request: NextRequest) {
    try {
        await ConnectDatabase(); // Connect to MongoDB

        const requestBody = await request.json();
        const { userId } = requestBody;

        if (!userId) {
            return new NextResponse("User ID is required.", { status: 400 });
        }

        const userCart = await CartModel.findOne({ userId });

        if (!userCart) {
            return new NextResponse("User's Cart not found.", { status: 404 });
        }

        const responseData = [];

        for (const cartProduct of userCart.products) {
            const product = await ProductModel.findOne({ productId: cartProduct.productId });
            if (product) {
                responseData.push({
                    productId: product.productId,
                    img: product.img,
                    name: product.name,
                    desc: product.desc,
                    companyId: product.companyId,
                    tags: product.tags,
                    colors: product.colors,
                    variations: product.variations,
                    createdAt: product.createdAt,
                    updatedAt: product.updatedAt,
                    comments: product.comments,
                    offers: product.offers,
                    // Add additional fields from userCart
                    colorIdx: cartProduct.colorIdx,
                    qty: cartProduct.qty,
                    variationIdx: cartProduct.variationIdx,
                });
            }
        }

        return new NextResponse(JSON.stringify(responseData), { status: 200 });
    } catch (error) {
        return new NextResponse("Error fetching data from the database. Please try again later." + error, { status: 500 });
    }
}