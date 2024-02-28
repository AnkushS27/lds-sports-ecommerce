import { ProductType } from "@/TypeInterfaces/TypeInterfaces";
import ProductModel from "../models/productModel";
import { ConnectDatabase } from "./Connector";

export async function getProduct(id: string) {
    await ConnectDatabase();

    const res = await ProductModel.findOne({productId:id});
    return res;
}

export async function addProduct(product: ProductType) {
    await ConnectDatabase();

    const res = await ProductModel.create(product);
    return res;
}

export async function updateProduct(prod: ProductType) {
    await ConnectDatabase();

    const res = await ProductModel.updateOne({productId:prod.productId},prod);
    return res;
}

export async function deleteProduct(id: string) {
    await ConnectDatabase();

    const res = await ProductModel.deleteOne({productId:id});
    return res;
}