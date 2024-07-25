import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/Cloudnary.js"

export const signIn = async (req,res) => {
    try {
        const {username , email , password} = req.body
        // console.log(password);
        if(!password) {
            return res
            .status(404)
            .json({message : "Password Required"})
        }
        if(!username && !email) {
            return res
            .status(404)
            .json({message : "username or email atleast one field required"})
        }

        const exisitingUser = await User.findOne({
            $or : [{email},{username}]
        })
        const checkPassword = await exisitingUser.isPasswordCorrect(password);

        if(!checkPassword) {
            return res
            .status(404)
            .json({message : "Incorrect Password"})
        }
        // generate the jwt tokens
        const refreshToken = exisitingUser.generateRefreshToken();
        const accessToken = exisitingUser.generateAccessToken();

        exisitingUser.refreshToken = refreshToken;
        await exisitingUser.save({validateBeforeSave: false})

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .json(exisitingUser,accessToken,refreshToken,{message : "user logged in sucessfully"})
    } catch (error) {
        return res
        .status(404)
        .json({message : error.message})
    }
}
export const signOut = async (req,res) => {
    const { id } = req.params

    const exisitingUser = await User.findByIdAndUpdate(id,
        {
            $unset : {
                refreshToken : 1
            }
        },
        {
            new  : true
        }
    );

    const options = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .json({message : "user logged out sucessfully"})

}
export const signUp= async (req,res) => {
    const {username,email,password} = req.body
    if(!username || !email || !password) {
        return res
        .status(404)
        .json({message : "All Fields Required"})
    }
    console.log(req.files);

    const filePath = req.files?.profileImage[0]?.path
    const profileImage = await uploadOnCloudinary(filePath)

    if(!profileImage) {
        return res
        .status(404)
        .json({message : "Internal Server Error Please Retry"})
    }

    const newUser = await User.create({
        email,
        password,
        username,
        profileImage : profileImage.url
    })

    return res
    .status(200)
    .json(newUser)
}
export const updateUser = async (req,res) => {
    try {
        const {id} = req.params
        const {password} = req.body   

        const filePath = req.files?.profileImage[0]?.path
        const profileImage =  await uploadOnCloudinary(filePath)

        const existingUser = await User.findByIdAndUpdate(id,
            {
                $set : {
                    profileImage : profileImage.url
                }
            },
            {
                new : true
            }
        )
        
        existingUser.password = password
        await existingUser.save()

        return res
        .status(200)
        .json(existingUser)
    } catch (error) {
        return res
        .status(404)
        .json({message : "Error In Updating User Details"})
    }
}