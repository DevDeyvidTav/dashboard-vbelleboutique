import { Button, Dialog, DialogClose, Flex, TextField } from "@radix-ui/themes";
import Image from "next/image";
import { StockTable } from "./table";
import { BiMessageRoundedAdd } from 'react-icons/bi'
interface Product {
    id?: string,
    name?: string,
    imageUrl: string,
    description?: string,
    price?: number
}
export function StockModal(product: Product) {
    const Id = product?.id? product?.id : ""
    return (
        <Dialog.Content className="w-4/5 h-3/4" >
            <Dialog.Title>Gerencie seu estoque</Dialog.Title>
            <div className="flex  items-center">
                <Image className="h-32 w-32 rounded-lg m-5" width={200} height={200} src={product?.imageUrl} alt="Produto" />
                <div>
                    <h2 className="font-bold text-[#955764]	">
                        {product?.name}
                    </h2>
                    <i
                        className="text-xs">
                        {product?.description}
                    </i>
                </div>
            </div>
            <div>
                <StockTable id={Id} />
                <div className="flex justify-center items-center gap-2 mt-6">
                    <Button
                        color="pink">
                        <BiMessageRoundedAdd /> Adicionar novo tamanho
                    </Button>
                    <DialogClose>
                        <Button variant="soft" color="pink">
                            Fechar
                        </Button>
                    </DialogClose>
                </div>
            </div>


        </Dialog.Content>
    )
}