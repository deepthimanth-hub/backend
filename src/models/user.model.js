import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String, //cloudinary url
        required: true
    },
    coverImage: {
        type: String, //cloudinary url
    },
    watchHistory: [{
        type: Schema.Types.ObjectId,
        ref: 'video'
    }],
    password: {
        type: String,
        required: [true, 'Password is required'] //hashed password
    },
    refreshToken: {
        type: String //hashed refresh token acts like a key to generate access token
    }
}, { timestamps: true })

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
        // compare given password(coverted into hash) and hashed password from database
}

userSchema.methods.generateAceessToken = function() {
    return jwt.sign({
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        })
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        })
}

export const User = mongoose.model('User', userSchema)


//'User' is name of the collection used internally by mongodb.
// variable user is the name of the model we use it in backend.
// internal name of collection is not used by us but its a good practice to name both of them same.