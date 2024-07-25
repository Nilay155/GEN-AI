import mongoose from "mongoose";

const chatHistorySchema = new mongoose.Schema(
    {

    },
    {
        timestamps : true
    }
)

export const ChatHistory = mongoose.model("ChatHistory",chatHistorySchema)