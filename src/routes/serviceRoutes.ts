import {Router} from "express"
import { 
    createService,
    deleteService,
    getAllServices,
    getServiceById,
    updateService
} from "../controllers/serviceController"

const service_routes =Router()



//#transation
service_routes.post("/",createService)
service_routes.get("/",getAllServices)
service_routes.get("/:id",getServiceById)
service_routes.delete("/:serviceId",deleteService)
service_routes.put("/service/:serviceId/prestador/:prestadorId",updateService)


export default service_routes;