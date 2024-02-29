import { ConnectDatabase } from '@/db/db_connections/Connector';
import CartModel from '@/db/models/cartModel';
import { CartType } from '@/TypeInterfaces/TypeInterfaces';

export async function getCart(id: string) {
    await ConnectDatabase();

    const res = await CartModel.findOne({cartId:id});
    return res;
}

export async function addToCart(cart: CartType) {
    await ConnectDatabase();

    const res = await CartModel.create(cart);
    return res;
}

export async function removeFromCart(id: string) {
    await ConnectDatabase();

    const res = await CartModel.deleteOne({cartId:id});
    return res;
}