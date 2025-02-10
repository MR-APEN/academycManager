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
                message: "Usuario no autorizado para crear cursos",
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

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("teacher", "name surname email")
    return res.status(200).json(courses)
  } catch (err) {
    return res.status(500).json({
      message: "Error al listar los cursos",
      error: err.message,
    })
  }
}

export const updateCourse = async (req, res) => {
  try {
    const { uid } = req.params
    const { title, description, teacherId } = req.body

    const teacher = await User.findById(teacherId)
    if(!teacher){
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
        error: err.message
      })
    }
    if (teacher.role !== "TEACHER_ROLE") {
      return res.status(403).json({
        message: "Acceso denegado: solo los profesores pueden actualizar cursos" 
      })
    }

    const course = await Course.findById(uid)
    if (!course) {
      return res.status(404).json({
        message: "Curso no encontrado"
      })
    }
    if (course.teacher.toString() !== teacherId) {
      return res.status(403).json({
        message: "Este no es su curso, Acceso denegado"
      })
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      uid,
      { title, description },
      { new: true }
    )

    return res.status(200).json({
      message: "Curso actualizado correctamente",
      course: updatedCourse,
    })
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar el curso",
      error: error.message,
    })
  }
}

export const deleteCourse = async (req, res) => {
  try {
    const { uid } = req.params
    const { teacherId } = req.body

    const teacher = await User.findById(teacherId)
    if(!teacher){
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
        error: err.message
      })
    }
    if (teacher.role !== "TEACHER_ROLE") {
      return res.status(403).json({
        message: "Acceso denegado: solo los profesores pueden eliminar cursos" 
      })
    }

    const course = await Course.findById(uid)
    if (!course) {
      return res.status(404).json({
        message: "Curso no encontrado"
      })
    }
    if (course.teacher.toString() !== teacherId) {
      return res.status(403).json({
        message: "Este no es tu curso, Acceso denegado"
      })
    }
    await Course.findByIdAndUpdate(uid, {students: []})

    await Course.findByIdAndUpdate(uid,{status: false}, {new: true});
    return res.status(200).json({
      success: true,
      message: "Curso eliminado correctamente"
    })
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar el curso",
      error: error.message,
    });
  }
};