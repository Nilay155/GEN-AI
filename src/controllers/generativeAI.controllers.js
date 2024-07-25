import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export const handleText = async (req,res) => {
    const { prompt } = req.body
    const model = genAI.getGenerativeModel({model : "gemini-1.5-flash"})

    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()

    return res
    .status(200)
    .json({message : text})

}

export const handleAudioText = async (req,res) => {

}

export const handleImageText = async (req,res) => {

}

export const handleTextCode = async (req,res) => {

}