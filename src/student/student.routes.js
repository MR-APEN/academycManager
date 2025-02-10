import { Router } from "express";
import { assignStudentToCourse, getStudentCourses, updateStudentProfile, deleteStudentProfile, updateStudentPassword } from "./student.controller.js"

const router = Router()

router.post("/assignToCourse", assignStudentToCourse)
router.get("/studentCourses/:studentId", getStudentCourses)
router.put("/updateStudent/:studentId" ,updateStudentProfile)
router.delete("/deleteStudent/:studentId", deleteStudentProfile)
router.patch("/updatePassword/:uid", updateStudentPassword)

export default routerQ