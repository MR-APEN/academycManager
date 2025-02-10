# Api Gestor Académico
Esta API está diseñada para gestionar a usuarios (Alumnos y Maestros) y cursos, Incluye las funcionalidades de CRUD para cursos y usuarios, así como gestionar asignaciones de cursos.

# Variables de entorno
Cree un archivo `.env` en el directorio raíz y agregue las siguientes variables:

```
PORT=<tu_puerto_del_servidor>
MONGO_URI=<tu_cadena_de_conexión_mongodb>
JWT_SECRET_KEY=<tu_secreto_jwt>
```
# Endpoints de la API
### Usuarios

- **Registrar Usuario**
  - **URL:** `/api/auth/register`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "username": "string",
      "email": "string",
      "password": "string",
      "profilePicture": "string",
      "role": "string"
    }
    ```

- **Iniciar Sesión**
  - **URL:** `/api/auth/login`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
### Alumnos
- **Asignarse curso**
  - **URL:** `/api/students/assignToCourse`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "studentId": "<user_id>",
      "courseId": "<course_id>"
    }
    ```
- **Listar Cursos por Estudiante**
  - **URL:** `/api/students/studentCourses/:studentId`
  - **Método:** `GET`

- **Actualizar Alumno**
  - **URL:** `/api/students/updateStudent/:studentId`
  - **Método:** `PUT`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "surname": "string",
      "email": "string",
    }
    ```
- **Actualizar contraseña alumno**
  - **URL:** `/api/students/updatePassword/:uid`
  - **Método:** `PATCH`
  - **Cuerpo:**
    ```json
    {
      "newPassword": "string",
    }
    ```
- **Eliminar Alumno**
  - **URL:** `/api/students/deleteStudent/:studentId`
  - **Método:** `DELETE`

 ### Maestro
 
- **Crear curso**
  - **URL:** `/api/course/createCourse/:uid`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "title": "string",
      "description": "string"
    }
    ```
- **Actualizar Curso**
  - **URL:** `/api/course/updateCourse/:uid`
  - **Método:** `PUT`
  - **Cuerpo:**
    ```json
    {
      "title": "string",
      "description": "string",
      "teacherId": "<user_id>",
    }
    ```

- **Listar cursos**
  - **URL:** `/api/course/`
  - **Método:** `GET`

- **Eliminar Curso**
  - **URL:** `/api/course/deleteCourse/:uid`
  - **Método:** `DELETE`
  - **Cuerpo:**
    ```json
    {
      "teacherId": "<user_id>",
    }
    ```

# Proyecto de Javier Apen 2023128 IN6BV
![gato_doom](https://github.com/user-attachments/assets/7b7fe18c-bac4-4a4f-bf1b-d99076513df0)

