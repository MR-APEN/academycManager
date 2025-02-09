import { Schema, model } from "mongoose";

const courseSchema = new Schema({
    title: {
        type: String,
        required: [true, "Course title is required"],
        trim: true,
        maxLength: [25, "Course title cannot exceed 25 characters"],
    },
    description: {
        type: String,
        trim: true,
        maxLength: [50, "Description cannot exceed 50 characters"],
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Teacher ID is required"],
    },
    students: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
    ],
    status: {
        type: Boolean,
        default: true,
    },
},
{
    versionKey: false,
    timestamps: true,
}
)
  
export default model("Course", courseSchema);