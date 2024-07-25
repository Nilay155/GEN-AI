import { Router } from "express";
import { authentication } from "../middleware/auth.js";
import { addComment } from "../controllers/comments.contoller.js"
const router = Router()

router.post("/comment",authentication,addComment);

export default router
