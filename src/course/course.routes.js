import { Router } from "express";
import { createCourse, getAllCourses, updateCourse, deleteCourse } from "./course.controller.js"

const router = Router()

router.post("/createCourse/:uid", createCourse)
router.get("/", getAllCourses)
router.put("/updateCourse/:uid", updateCourse)
router.delete("/deleteCourse/:uid", deleteCourse)

export default router