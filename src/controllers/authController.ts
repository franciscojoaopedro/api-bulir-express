import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from "../prisma";

const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY as string
export const login = async (req: Request, res: Response) => {
    const { email, senha } = req.body;
  
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !await bcrypt.compare(senha, user.senha)) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
  
    const token = jwt.sign({ id: user.id, tipoUsuario: user.tipoUsuario,email:user.email}, JWT_SECRET_KEY!, { expiresIn: '8h' });
    res.json({ token });
  };