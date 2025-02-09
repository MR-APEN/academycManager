import Course from "../course/course.model.js"
import User from "../user/user.model.js"

export const assignStudentToCourse = async (req, res) => {
    try {
      const { studentId, courseId } = req.body
  
      const student = await User.findById(studentId)

        if(!student){
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado",
                error: err.message
            })
        }

        if (student.role !== "STUDENT_ROLE") {
            return res.status(403).json({
                message: "Solo los estudiantes pueden inscribirse en cursos"
            });
        }
  
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "Curso no encontrado"
            })
        }
  
        if (course.students.includes(studentId)) {
            return res.status(400).json({
                message: "Curso inválido, ya estas inscrito en este curso"
            })
        }
  
        const studentCourses = await Course.find({ students: studentId })
        if (studentCourses.length >= 3) {
            return res.status(400).json({
                message: "No puedes inscribirte en más de 3 cursos"
            });
        }
  
        course.students.push(studentId);
        await course.save()
  
        return res.status(200).json({
            message: "Te has inscrito en el curso",
            course,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error al inscribirse en el curso",
            error: err.message,
        })
    }
}

export const getStudentCourses = async (req, res) => {
    try {
        const { studentId } = req.params;
      
        const student = await User.findById(studentId);
        if(!student){
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado",
                error: err.message
            })
        }
        if (student.role !== "STUDENT_ROLE") {
            return res.status(403).json({
                message: "Solo los estudiantes pueden acceder a sus cursos"
            });
        }
  
      const courses = await Course.find({students: studentId}).populate("teacher", "name surname");
  
      return res.status(200).json({
        message: "Cursos en los que estás inscrito",
        courses,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error al obtener los cursos del estudiante",
        error: err.message,
      });
    }
}