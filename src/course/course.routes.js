import { Router } from "express";
import { createCourse } from "./course.controller.js"

const router = Router()

router.post("/createCourse/:uid", createCourse)

export default router