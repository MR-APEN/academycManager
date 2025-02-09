import Course from "../course/course.model.js"
import User from "../user/user.model.js"

export const createCourse = async (req, res) => {
    try {
      const { uid } = req.params
      const { title, description } = req.body
  

        const user = await User.findById(uid)
        if(!user){
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado",
                error: err.message
            })
        }
      
      if (user.role !== "TEACHER_ROLE") {
        return res.status(404).json({
          message: "no autorizado para crear cursos",
        })
      }
  
      const newCourse = await Course.create({ title, description, teacher: uid })
      return res.status(200).json({
        message: "Curso creado exitosamente",
        course: newCourse,
      })
    } catch (err) {
      return res.status(500).json({
        message: "Error al crear el curso",
        error: err.message
      })
    }
  }