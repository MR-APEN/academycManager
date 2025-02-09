import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import authRoutes from "../src/auth/auth.routes.js"
import courseRoutes from "../src/course/course.routes.js"
import studentRoutes from "../src/student/student.routes.js"
import apiLimiter from "../src/middlewares/requests-validator.js"

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) => {
    app.use("/academycManager/v1/auth", authRoutes)
    app.use("/academycManager/v1/course", courseRoutes)
    app.use("/academycManager/v1/students", studentRoutes)
}

const conectDB = async () => {
    try {
        await dbConnection()
    } catch (error) {
        console.log(`Database connection failed ${error}`)
    }
}


export const initServer = () => {
    const app = express()
    try {
        middlewares(app)
        conectDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    } catch (error) {
        console.log(`Server init failed ${error}`)
    }
}