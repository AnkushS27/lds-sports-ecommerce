import { OrderType } from "@/TypeInterfaces/TypeInterfaces";
import OrderModel from "../models/orderModel";
import { ConnectDatabase } from "./Connector";

export async function getOrder(id: string) {
    await ConnectDatabase();

    const res = await OrderModel.findOne({orderId:id});
    return res;
}

export async function createOrder(order: OrderType) {
    await ConnectDatabase();

    const res = await OrderModel.create(order);
    return res;
}


// Handles the status update => {cancelled, refunded, not delivered, shipping,...}
export async function updateOrder(id: string, status: string) {
    await ConnectDatabase();

    const res = await OrderModel.updateOne({orderId:id},{status});
    return res;
}

export async function deleteOrder(id: string) {
    await ConnectDatabase();

    const res = await OrderModel.deleteOne({orderId:id});
    return res;
}