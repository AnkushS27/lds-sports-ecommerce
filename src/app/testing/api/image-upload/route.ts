import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    // Access the uploaded files
    const formData = await req?.formData();
    const files = formData ? Array.from(formData.entries()) : [];

    if (!files || files.length === 0) {
        return NextResponse.json({ message: 'No files uploaded' }, { status: 404 });
    }

    try {
        // Save each uploaded image in File System
        files.forEach(async ([name, file]) => {
            if (file instanceof File) {
                const byteData = await file.arrayBuffer();
                const buffer = Buffer.from(byteData);
                const path = `./public/${file.name}`;
                await writeFile(path,buffer);
            }
        });

        return NextResponse.json({ message: 'Images uploaded successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error uploading images:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
