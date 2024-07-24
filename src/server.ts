import express, { Request, Response } from "express"
import helmet from "helmet";
import cors from "cors"
import routes from "./routes";
import swagger from "swagger-ui-express"
import dotenv from "dotenv"
dotenv.config()

import bodyParser from "body-parser";
import limiter from "./middlewares/limite";
const app=express()
const PORT=process.env.PORT 

app.use(helmet({}))
app.use(helmet.hsts({ maxAge: 31536000 }));
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.xssFilter());

app.use(cors({origin:"*"}))
app.use(bodyParser.json({ limit: '50mb' }));
app.use(limiter)

const VERSION_API="/v1/api"

app.get(VERSION_API,(req,res)=>{

    return res.json({message:"Olá, sou uma api de teste!"})
})
const swaggerFileJson=require("./swagger-output.json")
app.use(`${VERSION_API}/documentacao`,swagger.serve,swagger.setup(swaggerFileJson))

app.use(VERSION_API,routes)

app.listen(PORT,()=>{
    console.log(`Servidor rodando na porta ${PORT}, http://localhost:${PORT}/v1/api`)
})