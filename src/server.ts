import express from "express"
import helmet from "helmet";


const app=express()

app.use(express.json({ limit: '10kb' }));
app.use(helmet({}))