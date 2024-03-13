import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { addProduct } from "@/db/db_connections/product"; // Import the function to add a product to MongoDB
import { formToJSON } from "axios";
import { FrontendProductType } from "@/app/cms/product/[Id]/page";
import { promises as fsPromises } from 'fs';

interface FrontToBackProductType {
    productId: string;
    name: string;
    desc: string;
    companyId: string;
    tags: string;
    variations: string;
  }
  
  export async function POST(req: NextRequest) {
    try {
      const formData = await req.formData();
      const res: FrontToBackProductType = formToJSON(formData) as FrontToBackProductType;
  
     // Store images on the server path
    let imgPaths = [];
    const imgFiles = formData.getAll('imgs');

    for (let index = 0; index < imgFiles.length; index++) {
        const imgFile = imgFiles[index];
      
        // Explicitly cast imgFile to Blob to access arrayBuffer method
        if (imgFile instanceof Blob) {
          const buffer = Buffer.from(await imgFile.arrayBuffer());
      
          // Save the image buffer to a file on the server
          const path = `./public/product-imgs/${res.productId}_${index}_${imgFile.name}`;
          imgPaths.push(path);
          await fsPromises.writeFile(path, buffer);
        }
      }
      // Prepare product object to send to MongoDB
      const { productId, name, desc, companyId } = res;
      const product = {
        productId,
        img: imgPaths,
        name,
        desc,
        companyId,
        tags: JSON.parse(res.tags),
        variations: JSON.parse(res.variations),
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
