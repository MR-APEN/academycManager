import { Schema, model, version } from "mongoose";

const userSchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    surname:{
        type: String,
        required: [true, "Surname is required"],
        maxLength: [25, "Surname cannot exceed 25 characters"]
    },
    email:{
        type: String,
        unique: true,
        required: [true, "Email is required"]
    },
    password:{
        type: String,
        unique: true,
        minLength: 8,
        required: true
    },
    profilePicture:{
        type: String
    },
    role:{
        type: String,
        required: true,
        enum: ["TEACHER_ROLE", "STUDENT_ROLE"]
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

userSchema.methods.toJSON = function(){
    const { password, _id, ...user} = this.toObject()
    user.uid = _id
    return user
}
export default model("User", userSchema)