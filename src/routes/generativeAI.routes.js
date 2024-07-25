import  { Router } from "express"
import { authentication } from "../middleware/auth.js"
import { handleText } from "../controllers/generativeAI.controllers.js"
const router = Router()

router.post("/generate-text-text",handleText)
// router.post("/generate-image-text",authentication,handleImageText)
// router.post("/generate-audio-text",authentication,handleAudioText)
// router.post("/generate-text-code",authentication,handleTextCode)

export default router