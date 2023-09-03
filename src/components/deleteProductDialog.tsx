import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";

export function DeleteProductDialog(id: any) {

    async function deleteStocks(){
        const response = await axios.delete('/api/delete_stocks_by_product', {
            params: {
                id: id.id
        }
    })
    return response
    }
    async function deleteProduct(){
        const response = await axios.delete('/api/delete_product', {
            params: {
                id: id.id
            }
        })
        return response
    }

    async function handleDelete(){
        try {
            await deleteStocks()
            await deleteProduct()
        } catch (error) {
            if (error instanceof axios.AxiosError) {
                console.error(error.response?.data.message)
            }
        }finally{
            window.location.reload()
        }
    }
    return (
        <AlertDialog.Content style={{ maxWidth: 450 }}>
            <AlertDialog.Title>Apagar produto!</AlertDialog.Title>
            <AlertDialog.Description size="2">
                Você realmente deseja deletar o produto?
            </AlertDialog.Description>

            <Flex gap="3" mt="4" justify="end">
                <AlertDialog.Cancel>
                    <Button variant="soft" color="gray">
                        Não
                    </Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                    <Button
                    onClick={handleDelete}
                    variant="solid" color="red">
                        Sim
                    </Button>
                </AlertDialog.Action>
            </Flex>
        </AlertDialog.Content>
    )
}