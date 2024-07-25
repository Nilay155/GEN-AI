import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.model.js"

export const addComment = async (req,res) => {

    try {
        const { id } = req.params
        const { postId , comment} = req.body // react post component will have a unique id which is the database object id

        const post = await Post.findById(postId);
        const commented = await Comment.create(
            {
                comment,
                user : id
            }
        )

        post.comments.push(commented);
        await post.save({validateBeforeSave : false})

        return res
        .status(200)
        .json(commented)

    } catch (error) {
        return res
        .status(404)
        .json({message : error.message})
    }
}