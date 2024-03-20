import mongoose from "mongoose";

const { Schema } = mongoose;

const variationSchema = new Schema({
    name: { type: String, required: true }, // This will be "Size"
    variations: [
        {
            value: { type: Number, required: true },
            stock: { type: Number, required: true },
            price: { type: Number, required: true },
        },
    ],
});

const productSchema = new Schema({
    productId: { type: String, required: true, unique: true },
    img: { type: [String], }, // URLs of the images
    name: { type: String, required: true },
    desc: { type: String, required: true },
    companyId: { type: String, required: true },  // Contains the copmany Id.
    tags: { type: [String], },
    colors: { type: [String], },
    variations: { type: variationSchema, required: true }, // Can be used via JSON.parse() and JSON.stringify()
    createdAt: { type: Date, default: Date.now, },
    updatedAt: { type: Date, default: Date.now, },

    comments: { type: [String], }, // CommentId[]
    offers: { type: [String], }, // OfferId[]
});

const ProductModel = mongoose.models.product || mongoose.model('product', productSchema);

export default ProductModel