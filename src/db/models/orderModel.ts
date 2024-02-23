import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderId: {type: String, required: true},
    userId: {type: String, required: true},
    products: [{type: {
        productId: {type: String, required: true},
        variations:{type: String,}, 
        qty: {type: Number, required: true, default: 1},
        unique: true
    },},],
    price: {type: Number, required: true},
    createdAt: {type: Date,default: Date.now,},
    status: {type: String, required: true},
});

const OrderModel = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default OrderModel