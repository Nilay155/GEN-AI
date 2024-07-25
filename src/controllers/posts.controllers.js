import { Like } from "../models/like.model.js"
import { Post } from "../models/post.model.js"
import { uploadOnCloudinary } from "../utils/Cloudnary.js"

export const uploadPost = async (req,res) => {
    try {
        const { id } = req.params
        const {title,description} = req.body
    
        const filePath = req.files?.post[0]?.path
    
        const response = await uploadOnCloudinary(filePath)
        const imageURL = response.url
    
        const createdPost = await Post.create(
            {
                title,
                description,
                postImage : imageURL,
                user : id
            }
        )

        return res
        .status(200)
        .json(createdPost)

    } catch(error) {
        return res
        .status(404)
        .json({message : error.message})
    }
    
}

export const likePost = async (req,res) => {

    try {
        const { id } = req.params
        const { postId } = req.body // whenever we render react components and have a unique post id with components

        const postLiked = await Post.findById(postId)

        let liked = false
        for(let i = 0 ; i < postLiked?.likes?.length ; i++) {
            const like = await Like.findById(postLiked.likes[i])
            if(like.likedBy.toString() == id) {
                liked = true
                break
            }
        }

        if(liked) {
            return res
            .status(400)
            .json({message : "Post Liked Already"})
        }

        const likedPost = await Like.create({
            post : postLiked,
            likedBy : id 
        })
        postLiked.likes.push(likedPost)
        postLiked.numberOfLikes += 1;

        await postLiked.save({validateBeforeSave : false})
        
        return res
        .status(200)
        .json(likedPost)
    } catch (error) {
        return res
        .status(404)
        .json({message : error.message})
    }
}

export const getPosts = async (req,res) => {
    try {
        
        const Posts = await Post.find()

        return res
        .status(200)
        .json(Posts)
    } catch (error) {
        return res
        .status(404)
        .json({message : error.message})
    }
}

export const getUserPosts = async (req,res) => {

    try {
        const { id } = req.params
        const allPosts = await Post.find()

        const userPosts = allPosts.filter((post) => {
            const userId = post.user.toString()
            if(userId != id) return post
        })

        return res
        .status(200)
        .json(userPosts)

    } catch (error) {
        return res
        .status(404)
        .json({message : error.message})
    }
}