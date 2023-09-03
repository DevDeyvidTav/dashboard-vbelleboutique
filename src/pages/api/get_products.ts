import { prisma } from '@/lib/prisma'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    throw new Error('Método não permitido')
  }
  const search = String(req.query.searchQuery)
  const category_id = String(req.query.categoryId)
  try {
    if (category_id === "" && search === "") {
      const response = await prisma.product.findMany()
      return res.status(200).json(response)
    }
    if (category_id === "" && search !== "") {
      const response = await prisma.product.findMany({
        where: {
          name: {
            contains: search
          }
        }
      })
      return res.status(200).json(response)
      
    }
        if (category_id !== "" && search !== "") {
      const response = await prisma.product.findMany({
        where: {
          name: {
            contains: search
          },
          categoryId: category_id
        }
      })
      return res.status(200).json(response)
    }
    const response = await prisma.product.findMany({
      where: {
        categoryId: category_id
      }
    })

    return res.status(200).json(response)
  }
  catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.error(error)
      return res.status(400).json(error)
    }
    console.error(error)
    return res.status(500).json({ message: 'Erro interno do servidor' })
  }
}