import User from "../user/user.model.js"
import { hash, verify } from "argon2"
import { generateJWT } from "../helpers/generate-jwt.js"
import { error } from "console"

export const register = async (req,res) => {
    try {
        const data = req.body
        let profilePicture = req.file ? req.file.filename : null
        const encryptedPassword = await hash(data.password)

        data.password = encryptedPassword
        data.profilePicture = profilePicture
        const user = await User.create(data)
        return res.status(200).json({
            message: "El usuario ha sido registrado",
            name: user.name,
            email: user.email
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            message: "Error al registrar usuario",
            error: err.message
        })
    }
}

export const login = async (req,res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({$or: [{email: email}]})
        if(!user){
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: `No existe un usuario con el correo ${email}`
            })
        }

        const validPassword = await verify(user.password, password)
        if(!validPassword){
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "Contraseña incorrecta"
            })
        }

        const token = await generateJWT(user.id)
        return res.status(200).json({
            message: "Inicio de sesión válido",
            userDetails:{
                token: token,
                profilePicture: user.profilePicture
            }
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al iniciar sesión",
            error: err.message
        })
    }
}