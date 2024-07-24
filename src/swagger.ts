import dotenv from "dotenv"
import swaggerAutogen from "swagger-autogen"
swaggerAutogen({ openapi: '3.0.0' })
dotenv.config()
const VERSION_API="/v1/api"
const PORT=process.env.PORT as string
const doc={
    info: {
        version: "1.0.0",
        title: "Api Bulir Teste",
        description: "Api restful Bulir"
    },
    host: `http://localhost:${PORT}${VERSION_API}`,
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    servers: [
        {
            url: `http://localhost:${PORT}${VERSION_API}`
        }
    ],
}

const outfile="./swagger-output.json"
const endpointsFiles = ['./routes/authRoutes.ts',"./routes/userRoutes.ts","./routes/transationRoutes.ts","./routes/serviceRoutes.ts"];
swaggerAutogen(outfile,endpointsFiles,doc)
