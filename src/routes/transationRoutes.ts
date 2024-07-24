import {Router} from "express"
import { 
    createTransaction,
    deleteTransaction,
    getAllTransactions,
    getTransactionById
} from "../controllers/transactionController"

const transation_routes =Router()



//#transation
transation_routes.post("/",createTransaction)
transation_routes.get("/",getAllTransactions)
transation_routes.get("/:id",getTransactionById)
transation_routes.delete("/:id",deleteTransaction)


export default transation_routes;