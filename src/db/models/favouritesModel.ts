import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema({
    favouriteId: {type: String, required: true, unique: true},
    userId: {type: String, required: true},
    products: [{type: {
        productId: {type: String, required: true},
        variations:{type: String,}, 
        qty: {type: Number, required: true, default: 1},
        unique: true
    },},],
});

const FavouriteModel = mongoose.models.Favourites || mongoose.model('Favourites', favouriteSchema);

export default FavouriteModel