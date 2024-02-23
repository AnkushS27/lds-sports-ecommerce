import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productId: {type: String, required: true, unique: true},
    img: {type: [String],}, // URLs of the images
    name: {type: String, required: true},
    desc: {type: String, required: true},
    companyId: {type: String, required: true},  // Contains the copmany Id.
    tags: [{type: {type: String}}],

    variations: [{type: {tpye: String}, }], // Can be used via JSON.parse() and JSON.stringify()
    createdAt: {type: Date,default: Date.now,},
    updatedAt: {type: Date,default: Date.now,},

    comments: [{type: {type: {
        commentId: { type: String, required: true},
        authorId: { type: String, required: true},
        content: {type: String, required: true},
        createdDate: {type: String, default: Date.now},
    },}, }],
});

const ProductModel = mongoose.models.Product || mongoose.model('product', productSchema);

export default ProductModel