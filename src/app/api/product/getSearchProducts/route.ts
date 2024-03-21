import { ConnectDatabase } from '@/db/db_connections/Connector';
import ProductModel from '@/db/models/productModel';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    await ConnectDatabase(); // Connect to MongoDB

    const requestBody = await req.json();
    const query = requestBody.query;

    if (!query) {
      return new NextResponse(JSON.stringify({ message: "Missing query parameter" }), { status: 400 });
    }

    const products = await ProductModel.find({ name: { $regex: query as string, $options: "i" } });

    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new NextResponse("Error fetching data from the database. Please try again later." + error, { status: 500 });
  }
}