import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, },
  pic: { type: String }, // URL of the image
  email: { type: String, required: true, unique: true, },
  password: { type: String, required: true, }, // Hash and salt password before storing
  profileCompletion: { type: Boolean, required: true }, // In case if user sign up but not sharing address and all.
  addresses: [{
    type: {
      houseno: { type: String, required: true, },
      street: { type: String, required: true, },
      landmark: { type: String, required: true, },
      city: { type: String, required: true, },
      state: { type: String, required: true, },
      postalCode: { type: String, required: true, },
    },
  },],
  phone: { type: String },
  isAdmin: { type: Boolean, default: false, },
  forgotPasswordToken: { type: String },
  forgotPasswordTokenExpiry: { type: Date },
  createdAt: { type: Date, default: Date.now, },
  updatedAt: { type: Date, default: Date.now, },
});

const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

export default UserModel