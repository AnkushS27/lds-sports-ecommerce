// // route.ts

// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {

//     const files = await req?.formData();

//     console.log(files);

//     return NextResponse.json({message:'success'});
// }

// pages/api/upload.ts

import { NextRequest, NextResponse } from 'next/server';
import { ConnectDatabase } from '@/db/db_connections/Connector';
import ImageModel from '@/db/models/imageModel';

export async function POST(req: NextRequest) {
    // Connect to MongoDB
    await ConnectDatabase();

    // Access the uploaded files
    const formData = await req?.formData();
    const files = formData ? Array.from(formData.values()) : [];

    if (!files || files.length === 0) {
        return NextResponse.json({message:'No files uploaded'},{status:404});
    }

    try {
        // Save each uploaded image to MongoDB
        for (const file of files) {
            const image = new ImageModel();
            image.data = file;
            await image.save();
        }
        return NextResponse.json({ message: 'Images uploaded successfully' },{ status:200});
    } catch (error) {
        console.error('Error uploading images:', error);
        return NextResponse.json({ error: 'Internal server error' },{ status: 500});
    }
}
