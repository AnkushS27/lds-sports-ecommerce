import { ConnectDatabase } from "./Connector";
import UserModel from "../models/userModel";

export async function getUser(email: string) {
    await ConnectDatabase();

    const res = await UserModel.findOne({ email });
    return res;
}


export async function addUser(email: string, password: string) {
    await ConnectDatabase();

    const res = await UserModel.create({email,password,username:'abc', profileCompletion:false});
    return res;
}