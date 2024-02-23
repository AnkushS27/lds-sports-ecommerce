import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    cartId: {type: String, required: true, unique: true},
    userId: {type: String, required: true},
    products: [{type: {
        productId: {type: String, required: true},
        variations:{type: String,}, 
        qty: {type: Number, required: true, default: 1},
        unique: true
    },},],
});

const CartModel = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default CartModel