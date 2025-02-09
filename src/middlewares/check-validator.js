import { body, param } from "express-validator";
import { emailExists, userExists } from "../helpers/db-validator.js";
import { validateField } from "./field-validator.js";
import { deleteFileOnError } from "./delete-file-on-error.js";

export const registerValidator = [
    body("name", "El nombre es obligatorio").not().isEmpty(),
    body("surname","El apellido es obligatorio").not().isEmpty(),
    body("email", "El correo es obligatorio").not().isEmpty(),
    body("email", "Ingrese un correo válido").isEmail(),
    body("email").custom(emailExists),
    body("password", "La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula y 1 número").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0
    }),
    validateField,
    deleteFileOnError
]

export const loginValidator = [
    body("email").not().isEmpty().isEmail().withMessage("Ingrese un correo válido"),
    body("password","La contraseña es incorrecta"),
    validateField,
    deleteFileOnError
]