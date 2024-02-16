import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
    name: {type: String, required: true,},
    email:{type: String, required: true,   unique: true,},
    password: {type: String,    required: true,}, // Hash and salt password before storing
    addresses: [{type: {
          firstName: {type: String, required: true,},
          lastName:  {type: String, required: true,},
          address:   {type: String, required: true,},
          city:      {type: String, required: true,},
          state:     {type: String, required: true,},
          country:   {type: String, required: true,},
          postalCode:{type: String, required: true,},
        },},],
    phone: {type: String, required: true,},
    isAdmin: {type: Boolean,default: false,},
    createdAt: {type: Date,default: Date.now,},
    updatedAt: {type: Date,default: Date.now,},
});

const UserModel = models.User || model('User', userSchema);

export default UserModel