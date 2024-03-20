import { ConnectDatabase } from '@/db/db_connections/Connector';
import { NextResponse } from 'next/server';
import ProductModel from '@/db/models/productModel';

export const GET = async (request: any) => {
  try {
    await ConnectDatabase(); // Connect to MongoDB

    const products = await ProductModel.find({});
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new NextResponse("Error fetching data from the database. Please try again later." + error, { status: 500 });
  }
}