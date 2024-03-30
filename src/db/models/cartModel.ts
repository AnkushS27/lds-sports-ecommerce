import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: [{
        type: {
            productId: { type: String, required: true },
            qty: { type: Number, required: true, default: 1 },
        },
    }],
});

const CartModel = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default CartModel