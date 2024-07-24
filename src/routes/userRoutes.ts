import {Router} from "express"
import { 
    register,
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser 
} from "../controllers/userController"
import { authVerify } from "../middlewares/authMiddleware"

const user_routes =Router()




user_routes.post("/",register)
user_routes.get("/",getAllUsers)
user_routes.get("/:id",getUserById)
user_routes.put("/:id",updateUser)
user_routes.delete("/:id",deleteUser)


export default user_routes;