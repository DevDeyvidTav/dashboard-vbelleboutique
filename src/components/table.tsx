import { Table, Button } from "@radix-ui/themes";
import { BiEdit, BiTrash, BiCheck, BiX } from 'react-icons/bi';
import { useState } from 'react';

type Stock = {
    id: string,
    size: string,
    amount: number
}

export function StockTable() {
    const initialStocks: Stock[] = [
        { id: "1", size: "P", amount: 20 },
        { id: "2", size: "M", amount: 25 },
    ];

    const [stocks, setStocks] = useState<Stock[]>(initialStocks);
    const [editingStockId, setEditingStockId] = useState<string | null>(null);
    const [editedSize, setEditedSize] = useState<string>('');
    const [editedAmount, setEditedAmount] = useState<number>(0);

    const handleEditClick = (stockId: string) => {
        const stockToEdit = stocks.find((stock) => stock.id === stockId);
        if (stockToEdit) {
            setEditingStockId(stockId);
            setEditedSize(stockToEdit.size);
            setEditedAmount(stockToEdit.amount);
        }
    };

    const handleSaveClick = (stockId: string) => {
        const updatedStocks = stocks.map((stock) =>
            stock.id === stockId
                ? { ...stock, size: editedSize, amount: editedAmount }
                : stock
        );
        setStocks(updatedStocks);
        setEditingStockId(null);
    };

    const handleCancelClick = () => {
        setEditingStockId(null);
    };

    return (
        <Table.Root variant="surface" className="w-full">
            <Table.Header className=" bg-[#ec9bca]">
                <Table.Row className="text-white">
                    <Table.ColumnHeaderCell>Tamanho</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Quantidade</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Ações</Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {stocks.map((stock) => (
                    <Table.Row key={stock.id}>
                        <Table.RowHeaderCell>
                            {editingStockId === stock.id ? (
                                <input
                                    type="text"
                                    value={editedSize}
                                    onChange={(e) => setEditedSize(e.target.value)}
                                    className="w-full p-1"
                                />
                            ) : (
                                stock.size
                            )}
                        </Table.RowHeaderCell>
                        <Table.Cell>
                            {editingStockId === stock.id ? (
                                <input
                                    type="number"
                                    value={editedAmount}
                                    onChange={(e) => setEditedAmount(Number(e.target.value))}
                                    className="w-full p-1"
                                />
                            ) : (
                                stock.amount
                            )}
                        </Table.Cell>
                        <Table.Cell>
                            {editingStockId === stock.id ? (
                                <div className="flex space-x-1">
                                    <Button
                                        color="green"
                                        className="flex items-center p-1"
                                        onClick={() => handleSaveClick(stock.id)}
                                    >
                                        <BiCheck />
                                    </Button>
                                    <Button
                                        color="red"
                                        className="flex items-center p-1"
                                        onClick={handleCancelClick}
                                    >
                                        <BiX />
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex space-x-1">
                                    <Button
                                        color="gray"
                                        className="flex items-center p-1"
                                        onClick={() => handleEditClick(stock.id)}
                                    >
                                        <BiEdit />
                                    </Button>
                                    <Button color="red" className="flex items-center p-1">
                                        <BiTrash />
                                    </Button>
                                </div>
                            )}
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    );
}
