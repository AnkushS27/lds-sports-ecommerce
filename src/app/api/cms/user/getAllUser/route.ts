import { ConnectDatabase } from '@/db/db_connections/Connector';
import { NextResponse } from 'next/server';
import UserModel from '@/db/models/userModel';

export const GET = async (request: any) => {
  try {
    await ConnectDatabase(); // Connect to MongoDB

    const users = await UserModel.find({});
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new NextResponse("Error fetching data from the database. Please try again later." + error, { status: 500 });
  }
}