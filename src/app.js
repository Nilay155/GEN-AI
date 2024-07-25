import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan"

const app = express()

app.use(cors())

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(morgan("dev"))

// Routes

import userRoutes from "./routes/user.routes.js"
app.use("/api/users",userRoutes)

import postRoutes from "./routes/posts.route.js"
app.use("/api/posts",postRoutes)

import commentRoutes from "./routes/comments.routes.js"
app.use("/api/comments",commentRoutes)

import generativeAIRoutes from "./routes/generativeAI.routes.js"
app.use("/api/ai",generativeAIRoutes)

export default app