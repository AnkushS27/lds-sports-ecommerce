import { NextRequest, NextResponse } from 'next/server';
import { getProduct } from '@/db/db_connections/product';

export async function POST(req: NextRequest) {
    try {
        // Parse the JSON data from the request body
        const requestBody = await req.json();
        
        // Retrieve the 'productId' field from the parsed JSON data
        const productId = requestBody?.productId;

        // Check if 'productId' is present before calling getProduct
        if (!productId) {
            return new NextResponse(JSON.stringify({ error: 'ProductId is required' }), {
                status: 400, // Bad Request
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Call the getProduct function with the productId parameter
        const product = await getProduct(productId);

        // Check if the product exists
        if (!product) {
            return new NextResponse(JSON.stringify({ error: 'Product not found' }), {
                status: 404, // Not Found
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Return the product data
        return new NextResponse(JSON.stringify(product), {
            status: 200, // OK
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        // Handle errors
        console.error('Error processing request:', error);

        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500, // Internal Server Error
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
