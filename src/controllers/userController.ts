import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../prisma';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  };
  
  export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  };
  
  export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, email, senha, tipoUsuario } = req.body;
  
    const hashedSenha = senha ? await bcrypt.hash(senha, 10) : undefined;
  
    try {
      const user = await prisma.user.update({
        where: { id: Number(id) },
        data: {
          nome,
          email,
          senha: hashedSenha,
          tipoUsuario,
        },
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao atualizar usuário' });
    }
  };
  
  export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      await prisma.user.delete({ where: { id: Number(id) } });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  };