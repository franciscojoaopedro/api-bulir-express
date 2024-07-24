import { Request, Response } from 'express';
import prisma from '../prisma';


export const createService = async (req: Request, res: Response) => {
  const { titulo, descricao, preco, prestadorId } = req.body;

  
  try {
    const ehPrestador=await prisma.user.findUnique({where:{
      id:prestadorId,
      tipoUsuario:"Prestador"
    }})
    if(!ehPrestador) return res.status(400).json({ error: 'Erro ao criar serviço, o usuairo não eh um prestrador de serviço!' });
    const service = await prisma.service.create({
      data: {
        titulo,
        descricao,
        preco,
        prestadorId,
      },
    });
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar serviço' });
  }
};

export const getAllServices = async (req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany({
      include:{
        prestador:{select:{id:true,nome:true,nif:true,email:true}},
        transacoes:true
      }
    });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar serviços' });
  }
};

export const getServiceById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const service = await prisma.service.findUnique({ where: { id: Number(id) } });
    if (!service) {
      return res.status(404).json({ error: 'Serviço não encontrado' });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar serviço' });
  }
};

export const updateService = async (req: Request, res: Response) => {
  const { serviceId,prestadorId } = req.params;
  const { titulo, descricao, preco } = req.body;

  try {
    const service = await prisma.service.update({
      where: { id: Number(serviceId),prestadorId:Number(prestadorId)},
      data: { titulo, descricao, preco },
    });
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar serviço' });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  req.setTimeout(60000)

  try {
    await prisma.service.delete({ where: { id: Number(serviceId) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar serviço' });
  }
};
