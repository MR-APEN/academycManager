import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";

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
        conectDB()
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    } catch (error) {
        console.log(`Server init failed ${error}`)
    }
}