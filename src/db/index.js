import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async() => {
    try {
        const connection_instance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB Connected !! DB HOST : ${connection_instance.connection.host}`);
    } catch (error) {
        console.error("MONGODB connection error: ", error);
        process.exit(1);
    }
}

export default connectDB;