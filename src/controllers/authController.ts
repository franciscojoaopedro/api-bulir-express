import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from "../prisma";





export const register = async (req: Request, res: Response) => {
    const { nome, nif, email, senha, tipoUsuario } = req.body;
  
    const hashedSenha = await bcrypt.hash(senha, 10);
  
    try {
      const user = await prisma.user.create({
        data: { nome, nif, email, senha: hashedSenha, tipoUsuario }
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao registrar usuário' });
    }
  };
  
export const login = async (req: Request, res: Response) => {
    const { email, senha } = req.body;
  
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !await bcrypt.compare(senha, user.senha)) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
  
    const token = jwt.sign({ id: user.id, tipoUsuario: user.tipoUsuario }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.json({ token });
  };