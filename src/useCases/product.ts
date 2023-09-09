import axios from "axios"
import { toast } from "react-toastify"

export interface Product {
    name: string,
    price: number,
    description: string,
    imageUrl: string,
    categoryId: string
}


export async function createProduct(product: Product){
    try {
        const response = await axios.post('/api/product', product)
        return response
    } catch (error) {
        if (error instanceof axios.AxiosError) {
            console.error(error.response?.data.message)
            toast.error(error.response?.data.message)
        }
        if (error instanceof Error) {
            console.error(error.message)
            toast.error(error.message)
        }
    }
}