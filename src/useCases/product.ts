import { Product } from "@prisma/client"
import axios from "axios"




export async function createProduct(product: Product){
    const response = await axios.post('/product', product)
}