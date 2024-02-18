import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, required: true,},
    email:{type: String, required: true,   unique: true,},
    password: {type: String, required: true,}, // Hash and salt password before storing
    addresses: [{type: {
          firstName: {type: String, required: true,},
          lastName:  {type: String, required: true,},
          address:   {type: String, required: true,},
          city:      {type: String, required: true,},
          state:     {type: String, required: true,},
          country:   {type: String, required: true,},
          postalCode:{type: String, required: true,},
        },},],
    phone: {type: String},
    isAdmin: {type: Boolean,default: false,},
    forgotPasswordToken: {type:String},
    forgotPasswordTokenExpiry: {type:Date},
    createdAt: {type: Date,default: Date.now,},
    updatedAt: {type: Date,default: Date.now,},
});

const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

export default UserModel