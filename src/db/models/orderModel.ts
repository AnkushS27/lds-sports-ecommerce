import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: [{
        type: {
            productId: { type: String, required: true },
            qty: { type: Number, required: true, default: 1 },
            colorIdx: { type: Number, required: true, default: 0 },
            variationIdx: { type: Number, required: true, default: 0 },
        },
    }],
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now, },
    status: { type: String, required: true, default: 'ordered'},
});

const OrderModel = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default OrderModel