// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/lib/prisma'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    throw new Error('Método não permitido')
  }
  const { id } = req.body
  try {
    const response = await prisma.stock.update({
      where: {
        id: id
      },
      data: {
        size: req.body.size,
        amount: req.body.amount
      }
    })

    return res.status(200).json(response)
  }
   catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.error(error)
      return res.status(400).json( error )
    }
    console.error(error)
    return res.status(500).json({ message: 'Erro interno do servidor' })
  }
}