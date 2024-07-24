import { Request, Response } from 'express';
import prisma from '../prisma';



// Historico de Transaçoes:
export const createTransaction = async (req: Request, res: Response) => {
  const { servicoId, clienteId, prestadorId } = req.body;

  try {
    
    const cliente = await prisma.user.findUnique({ where: { id: clienteId } });
    const servico = await prisma.service.findUnique({ where: { id: servicoId } });

    // prestador não pode contratar o seu proprio serviço
    const verficarSeServicePertenceAoPrestador=await prisma.service.findUnique({where:{
      id:servicoId,
      prestador:{
        id:clienteId
      }
    }})
    if(verficarSeServicePertenceAoPrestador) return res.status(404).json({ error: 'Não possivel o prestador contratar o seu proprio serviço' });
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    if (!servico) {
      return res.status(404).json({ error: 'Serviço não encontrado' });
    }

    
    if (cliente.saldo < servico.preco) {
      return res.status(400).json({ error: 'Saldo insuficiente para contratar o serviço' });
    }

    // Criar a transação
  
    const transaction = await prisma.transaction.create({
      data: {
        servicoId,
        clienteId,
        prestadorId,
        valor: servico.preco,
      },
    });

    // Atualizar o saldo do cliente e do prestador
    await prisma.user.update({
      where: { id: clienteId },
      data: { saldo: cliente.saldo - servico.preco },
    });
    // Atualizar o saldo do prestador
    await prisma.user.update({
      where: { id: prestadorId },
      data: { saldo: { increment: servico.preco } },
    });

    res.status(201).json(transaction);
    
   console.log(verficarSeServicePertenceAoPrestador)
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar transação' });
  }
};




// Manter um histórico de todas as transações realizadas na plataforma.
export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await prisma.transaction.findMany({
      include:{servico:true,
        prestador:{select:{id:true,nome:true,email:true,saldo:true}},
        cliente:{select:{id:true,nome:true,email:true,saldo:true}}}
    });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar transações' });
  }
};

export const getTransactionById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const transaction = await prisma.transaction.findUnique(
        { 
        where: { id: Number(id) },
    },
    );
    if (!transaction) {
      return res.status(404).json({ error: 'Transação não encontrada' });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar transação' });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.transaction.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar transação' });
  }
};
