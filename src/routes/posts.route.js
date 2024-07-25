import { Router } from "express"
import { getPosts, getUserPosts, likePost, uploadPost } from "../controllers/posts.controllers.js";
import { upload } from "../middleware/multer.js";
import { authentication } from "../middleware/auth.js";

const router = Router()

router.post("/upload-post/:id",authentication,upload.fields(
    [
        {
            name : "post",
            maxCount : 1
        }
    ]
),uploadPost)

router.post("/like-post/:id",authentication,likePost)
router.get("/posts",authentication,getPosts);
router.get("/user-posts/:id",authentication,getUserPosts);

export default router
