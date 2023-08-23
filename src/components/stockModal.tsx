import { Button, Dialog, DialogClose, Flex, TextField } from "@radix-ui/themes";
import Image from "next/image";
import { StockTable } from "./table";
import { BiMessageRoundedAdd } from 'react-icons/bi'
type Product = {
    id: string,
    name: string,
    imageUrl: string,
    description: string,
    price: number
}
export function StockModal(product: Product) {
    return (
        <Dialog.Content className="w-4/5 h-3/4" >
            <Dialog.Title>Gerencie seu estoque</Dialog.Title>
            <div className="flex  items-center">
                <Image width={200} height={200} src={'/logo.png'} alt="Produto" />
                <div>
                    <h2 className="font-bold text-[#955764]	">
                        Produto
                    </h2>
                    <i
                        className="text-xs">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius tenetur consequatur iusto quae ut earum commodi dolores fugit? Quas natus sequi quam laboriosam quae autem doloremque incidunt placeat facilis ratione!
                    </i>
                </div>
            </div>
            <div>
                <StockTable />
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