import { ConnectDatabase } from "./Connector";
import UserModel from "../models/userModel";
import { UserType } from "@/TypeInterfaces/TypeInterfaces";

export async function getUser(email: string) {
    await ConnectDatabase();

    const res = await UserModel.findOne({ email });
    return res;
}


export async function addUser(name: string, email: string, password: string) {
    await ConnectDatabase();

    const res = await UserModel.create({email,password,username:name, profileCompletion:false});
    return res;
}

export async function updateUser(email: string, { username, phone, addresses }: UserType) {
    await ConnectDatabase();

      const res = await UserModel.updateOne({ email }, { $set: { username, phone, addresses } });
        
      return res;
}

export async function deleteUser(user: UserType) {
    await ConnectDatabase();

    const res = await UserModel.deleteOne({email:user.email});
    return res;
}
