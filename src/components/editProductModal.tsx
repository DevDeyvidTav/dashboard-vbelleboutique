import { Button, Dialog, DialogClose} from '@radix-ui/themes';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import { AiOutlineCheck, AiOutlineEdit } from 'react-icons/ai'; // Importe o ícone de edição
import { toast } from 'react-toastify';

interface Product {
    id?: string;
    name?: string;
    imageUrl: string;
    description?: string;
    price?: number;
    categoryId?: string;
}

export function EditProductModal(product: Product) {
    const [editedProduct, setEditedProduct] = useState<number>();
    const [newName, setNewName] = useState<string>();
    const [newDescription, setNewDescription] = useState<string>();
    const [newPrice, setNewPrice] = useState<number | undefined>(product.price);

    const handleSaveChanges = async() => {
        const newProduct = {
            id: product.id,
            newName: newName,
            newDescription: newDescription,
            newPrice: newPrice
        }
        try {
           const response = await axios.put("/api/edit_product", newProduct)
           return response.data
        } catch (error) {
            if (error instanceof axios.AxiosError) {
                console.error(error.response?.data.message)
            }
        } finally {
            window.location.reload()
        }
    };

    function handleEditSelectedProduct(index: number, type: string) {
        setEditedProduct(index);
        if (type === 'name') {
            setNewName(product.name);
        }
        if (type === 'description') {
            setNewDescription(product.description);
        }
        if (type === 'price') {
            setNewPrice(product.price);
        }
        if (type === 'name' && newName){
            setNewName(newName)
        }
        if (type === 'description' && newDescription){
            setNewDescription(newDescription)
        }
        if (type === 'description' && newDescription){
            setNewDescription(newDescription)
        }
        if (type === 'price' && newPrice){
            setNewPrice(newPrice)
        }
    }

    return (
        <Dialog.Content className="w-96">
            <Dialog.Title className="text-xl text-center font-bold mb-4">Editar Produto</Dialog.Title>
            <div className="flex flex-col items-start w-2/5 mx-auto">
                <Image
                    className="h-32 w-32 rounded-lg mb-4"
                    width={200}
                    height={200}
                    src={product.imageUrl}
                    alt="Produto"
                />
                {editedProduct === 1 ? (
                    <div className="flex items-center mb-4">
                        <input
                            type="text"
                            onBlur={() => setEditedProduct(undefined)}
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="border rounded px-2 py-1 mr-2"
                        />
                        <button onClick={() => setEditedProduct(undefined)}>
                            <AiOutlineCheck />
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center cursor-pointer mb-2" onClick={() => handleEditSelectedProduct(1, 'name')}>
                        <p className="font-bold text-[#955764]">{newName ? newName : product.name}</p>
                        <AiOutlineEdit className="ml-2 cursor-pointer text-gray-500" />
                    </div>
                )}
                {editedProduct === 2 ? (
                    <div className="flex items-center mb-4">
                        <input
                            type="text"
                            onBlur={() => setEditedProduct(undefined)}
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            className="border rounded px-2 py-1 mr-2"
                        />
                        <button onClick={() => setEditedProduct(undefined)}>
                            <AiOutlineCheck />
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center cursor-pointer mb-2" onClick={() => handleEditSelectedProduct(2, 'description')}>
                        <p className="text-gray-500">{newDescription ? newDescription : product.description}</p>
                        <AiOutlineEdit className="ml-2 cursor-pointer text-gray-500" />
                    </div>
                )}
                {editedProduct === 3 ? (
                    <div className="flex items-center mb-4">
                        <input
                            type="number"
                            onBlur={() => setEditedProduct(undefined)}
                            value={newPrice !== undefined ? newPrice : ''}
                            onChange={(e) =>
                                setNewPrice(e.target.value !== '' ? Number(e.target.value) : undefined)
                            }
                            className="border rounded px-2 py-1 mr-2"
                        />
                        <button onClick={() => setEditedProduct(undefined)}>
                            <AiOutlineCheck />
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center cursor-pointer" onClick={() => handleEditSelectedProduct(3, 'price')}>
                        <p className="font-bold text-[#955764]">R$ {newPrice ? newPrice : product.price}</p>
                        <AiOutlineEdit className="ml-2 cursor-pointer text-gray-500" />
                    </div>
                )}
            </div>
            <div className="flex justify-center mt-6">
                <Button variant="soft" color="pink" onClick={handleSaveChanges}>
                    Salvar Alterações
                </Button>
                <DialogClose>
                    <Button variant="soft" color="pink" className="ml-4">
                        Fechar
                    </Button>
                </DialogClose>
            </div>
        </Dialog.Content>
    );
}
