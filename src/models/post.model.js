    import mongoose from "mongoose"

    const postSchema = new mongoose.Schema(
        {
            title : {
                type : String,
                required : true
            },
            description : {
                type : String,
                required : true
            },
            postImage : {
                type : String,
                required : true
            },
            user : {
                type : mongoose.Types.ObjectId,
                ref : "User",
                required : true
            },
            likes : [
                {
                    type : mongoose.Types.ObjectId,
                    ref : "Like"
                }
            ],
            comments : [
                {
                    type : mongoose.Types.ObjectId,
                    ref : "Comment"
                }
            ],
            numberOfLikes : {
                type : Number,
                default : 0
            },
        },
        {
            timestamps : true
        }
    )

    export const Post = mongoose.model("Post",postSchema)