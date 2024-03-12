import { NextRequest, NextResponse } from 'next/server';
import { getProduct } from '@/db/db_connections/product';

export async function POST(req: NextRequest) {
    try {
        // Parse the JSON data from the request body
        const requestBody = await req.json();
        
        // Retrieve the 'email' field from the parsed JSON data
        const productId = requestBody?.productId;

        // Check if 'productId' is present before calling getUser
        if (!productId) {
            return new NextResponse(JSON.stringify({ error: 'ProductId is required' }), {
                status: 400, // Bad Request
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Call the getProduct function with the email parameter
        const product = await getProduct(productId);

        // Return the product data
        return new NextResponse(JSON.stringify(product), {
            status: 200, // OK
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        // Handle parsing errors
        return new NextResponse(JSON.stringify({ error: 'Error parsing the request body' }), {
            status: 500, // Internal Server Error
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
