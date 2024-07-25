import { Router } from "express"
import { signIn,signOut,signUp,updateUser } from "../controllers/user.controllers.js"
import { upload } from "../middleware/multer.js"
import { authentication } from "../middleware/auth.js"

const router = Router()

router.post("/sign-in",signIn)
router.get("/sign-out/:id",authentication,signOut)

router.post("/sign-up",upload.fields(
    [
        {
            name : 'profileImage',
            maxCount : 2
        }
    ]
),signUp)

router.post("/update-user/:id",authentication,upload.fields(
    [
        {
            name : 'profileImage',
            maxCount : 1
        }
    ]
),updateUser)

export default router
