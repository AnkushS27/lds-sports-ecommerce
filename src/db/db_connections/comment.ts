import { CommentType } from "@/TypeInterfaces/TypeInterfaces";
import CommentModel from "../models/commentModel";
import { ConnectDatabase } from "./Connector";

export async function getComment(id: string) {
    await ConnectDatabase();

    const res = await CommentModel.findOne({commentId:id});
    return res;
}

export async function deleteComment(id: string) {
    await ConnectDatabase();

    const res = await CommentModel.deleteOne({commentId:id});
    return res;
}

export async function updateComment(c:CommentType) {
    await ConnectDatabase();

    const res = await CommentModel.updateOne({commentId:c.commentId},c);
    return res;
}

export async function createComment(c:CommentType) {
    await ConnectDatabase();

    const res = await CommentModel.create(c);
    return res;
}