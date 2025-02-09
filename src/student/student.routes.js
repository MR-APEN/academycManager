import { Router } from "express";
import { assignStudentToCourse, getStudentCourses } from "./student.controller.js"

const router = Router()

router.post("/assignToCourse", assignStudentToCourse)
router.get("/studentCourses/:studentId", getStudentCourses)

export default router