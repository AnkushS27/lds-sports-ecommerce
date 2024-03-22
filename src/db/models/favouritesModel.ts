import mongoose from "mongoose";
const { Schema } = mongoose;

const favouriteSchema = new Schema({
    userId: {type: String, required: true},
    products: [{type: String, required: true}],
});

const FavouriteModel = mongoose.models.Favourites || mongoose.model('Favourites', favouriteSchema);

export default FavouriteModel