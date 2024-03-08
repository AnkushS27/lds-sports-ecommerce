import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { addProduct } from "@/db/db_connections/product"; // Import the function to add a product to MongoDB
import { formToJSON } from "axios";
import { FrontendProductType } from "@/app/cms/product/[Id]/page";

interface FrontToBackProductType {
    productId: string;
    imgs: File[];
    name: string;
    companyId: string;
    price: string;
    tags: string;
    desc: string;
    variations: string;
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const res:FrontToBackProductType = formToJSON(formData) as FrontToBackProductType;
        // Store images on the server path
        let imgPaths = [];
        let imgs = formData.getAll('imgs');
        let prodId = res.productId;
        console.log(prodId);
        for (let index = 0; index < imgs.length; index++) {
            const img = imgs[index];
            if (img instanceof File) {
                const byteData = await img.arrayBuffer();
                const buffer = Buffer.from(byteData);
                const path = `./public/product-imgs/${img.name}_${prodId}`;
                imgPaths.push(path);
                await writeFile(path, buffer);
            }
        }

        // Prepare product object to send to MongoDB
        const { productId, name, desc, companyId } = res;
        const product = {
            productId, // Ensure productId is a string
            img: imgPaths,
            name, // Ensure name is a string
            desc, // Ensure desc is a string
            companyId, // Ensure companyId is a string
            tags: JSON.parse(res.tags), // Ensure tags is an array
            variations: JSON.parse(res.variations), // Ensure variations is an object
            createdAt: new Date(),
            updatedAt: new Date(),
        };

    // Add product to MongoDB
    await addProduct(product);
        return NextResponse.json({ message: 'Data received successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' });
    }
}