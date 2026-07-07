import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHanlder.js"
import jwt from "jsonwebtoken"
import { user } from "../models/user.model.js"

//here we are accessing refreshtoken from request
//req.header contains authorization(key)
// Authorization : Bearer "<token>" so we are replacing with empty space
// here we are using access token to get user object 
//  bcoz header of access token contains all credentials along with id
// refreshToken header has only id

export const verifyJWT = asyncHandler(async(req,res,next) =>{
    try{
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")

        if(!token) {
           throw new ApiError(401,"Unauthorized request")
        }

        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

       if (!user) {
           //frontend
           throw new ApiError(401,"Invalid Access Token")
        }
        req.user = user
        next()

    } catch(error){
        throw new ApiError(401,error?.message || "Invalid access token")
    }
})