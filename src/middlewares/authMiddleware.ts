import { Request, Response,NextFunction} from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY as string
export const authVerify=async(req:Request,res:Response,next: NextFunction)=>{
    try {
        const authHeader=req.headers.authorization
        const token=authHeader && authHeader?.split(" ")[1];
        if(token===null)return res.status(401).json({ message: 'Acesso negado. Token nulo.' });
        if(!token){
        return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
        }
     
        jwt.verify(token,JWT_SECRET_KEY,(error,user)=>{
            if(error) return  res.status(400).json({ message: 'Token inválido.' });
            req.user=user
            console.log(user,"auth")
            next()
        })
       
       
      
    } catch (error) {
        res.status(400).json({ message: 'Token inválido.' });
    }
}