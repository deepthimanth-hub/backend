import express from 'express';
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({
    limit: "16kb"
}))

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

app.use(express.static("public"))
app.use(cookieParser())


//routers import
import userRouter from "./routes/user.routes.js"

//routers declaration
app.use("/api/v1/users", userRouter)

//  http://localhost:8000/api/v1/users/register
// additional v1 is added to route to make future version like v2 without breaking existing routes

export { app };