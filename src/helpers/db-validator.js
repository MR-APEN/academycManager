import User from "../user/user.model.js"

export const emailExists = async(email = "") => {
    const exist = await User.findOne({email})
    if(exist){
        throw new Error(`El correo ${email} ya fue registrado`)
    }
}

export const userExists = async (uid = "") => {
    const exist = await User.findById(uid)
    if(!exist){
        throw new Error("El usuario no existe")
    }
}