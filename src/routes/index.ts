import { Router } from "express";
import auth_router from "./authRoutes";
import user_routes from "./userRoutes";
import transation_routes from "./transationRoutes";
import service_routes from "./serviceRoutes";
import { authVerify } from "../middlewares/authMiddleware";

const routes=Router()



routes.use("/auth",auth_router)
routes.use("/user", authVerify, user_routes)
routes.use("/transation",authVerify,transation_routes)
routes.use("/service",authVerify,service_routes)


export default routes;