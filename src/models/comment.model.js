import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        comment : {
            type : String,
            required : true
        },
        commeter : {
            type : mongoose.Types.ObjectId,
            ref : "User"
        },
        post : {
            type : mongoose.Types.ObjectId,
            ref : "Post"
        }
    },
    {
        timestamps : true
    }
)

export const Comment = mongoose.model("Comment",commentSchema)