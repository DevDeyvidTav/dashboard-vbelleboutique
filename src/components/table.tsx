import { Table, Button } from "@radix-ui/themes";
import { BiEdit, BiTrash, BiCheck, BiX, BiPlus } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import axios from "axios";

type Stock = {
  id: string;
  size: string;
  amount: number;
};
console.log
export function StockTable(id: any) {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [editingStock, setEditingStock] = useState<Stock | null>(null);
  const [editedSize, setEditedSize] = useState<string>('');
  const [editedAmount, setEditedAmount] = useState<number>(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSize, setNewSize] = useState('');
  const [newAmount, setNewAmount] = useState(0);


  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete('/api/delete_stock', {
        params: {
          id: id
        }
      })
      return response.data
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }

    } finally {
      getStocks()
    }
  }

  const handleEditClick = (stockId: string) => {
    const stockToEdit = stocks.find((stock) => stock.id === stockId);
    if (stockToEdit) {
      setEditingStock(stockToEdit);
      setEditedAmount(stockToEdit.amount);
      setEditedSize(stockToEdit.size);
    }
  };
  async function getStocks() {
    try {
      const response = await axios.get('/api/get_stock', {
        params: {
          productId: id.id
        }
      })
      const data = await response.data
      setStocks(data)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  } const handleSaveClick = async (stockId: string) => {
    try {
      const updatedStocks = stocks.map((stock) =>
        stock.id === stockId ? { ...stock, size: editedSize, amount: editedAmount } : stock
      );
      setStocks(updatedStocks);
      setEditingStock(null);

      await axios.put('/api/put_stock', {
        id: stockId,
        size: editedSize,
        amount: editedAmount,
      });

      getStocks()
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const handleCancelClick = () => {
    setEditingStock(null);
    setShowAddForm(false);
  };

  const handleAddClick = () => {
    setShowAddForm(true);

  };

  const handleAddFormSubmit = async () => {
    try {
      const response = await axios.post('/api/create_stock', {
        productId: id.id,
        size: newSize,
        amount: newAmount
      })
      return response
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    } finally {
      setShowAddForm(false);
      getStocks()
    }
  };
  useEffect(() => {
    if (stocks.length === 0) {
      getStocks()
    }
  }, [])
  return (
    <Table.Root variant="surface" className="w-full">
      <Table.Header className="bg-[#ec9bca]">
        <Table.Row className="text-white">
          <Table.ColumnHeaderCell>Tamanho</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Quantidade</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Ações</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {editingStock ? (
          <Table.Row>
            <Table.RowHeaderCell>
              <input
                type="text"
                value={editedSize}
                onChange={(e) => setEditedSize(e.target.value)}
                className="w-full p-1"
              />
            </Table.RowHeaderCell>
            <Table.Cell>
              <input
                type="text" 
                value={editedAmount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!isNaN(Number(value))) {
                    setEditedAmount(Number(value));
                  }
                }}
                className="w-full p-1"
              />
            </Table.Cell>
            <Table.Cell className="flex gap-2">
              <Button
                color="green"
                className="flex items-center p-1"
                onClick={() => handleSaveClick(editingStock.id)}
              >
                <BiCheck />
              </Button>
              <Button
                color="red"
                className="flex items-center p-1 "
                onClick={handleCancelClick}
              >
                <BiX />
              </Button>
            </Table.Cell>
          </Table.Row>
        ) : (
          stocks.map((stock) => (
            <Table.Row key={stock.id}>
              <Table.Cell>{stock.size}</Table.Cell>
              <Table.Cell>{stock.amount}</Table.Cell>
              <Table.Cell>
                <Button
                  color="blue"
                  className="flex items-center p-1"
                  onClick={() => handleEditClick(stock.id)}
                >
                  <BiEdit />
                </Button>
                <Button
                  onClick={() => handleDelete(stock.id)}
                  color="red"
                  className="flex items-center p-1"

                >
                  <BiTrash />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))
        )
        }
        {showAddForm && (
          <Table.Row>
            <Table.RowHeaderCell>
              <input
                type="text"
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
                className="w-full p-1"
              />
            </Table.RowHeaderCell>
            <Table.Cell>
              <input
                type="text"
                value={newAmount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!isNaN(Number(value))) {
                    setNewAmount(Number(value));
                  }
                }}
                className="w-full p-1"
                inputMode="numeric"
              />
            </Table.Cell>
            <Table.Cell className="flex gap-1">
              <Button
                color="green"
                className="flex items-center p-1"
                onClick={() => handleAddFormSubmit()}
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
            </Table.Cell>
          </Table.Row>
        )}

      </Table.Body>

      <div>
        <Table.Row>
          <Table.Cell>
            <Button
              color="gray"
              className="flex items-center p-1"
              onClick={handleAddClick}
            >
              <BiPlus />
            </Button>
          </Table.Cell>
        </Table.Row>
      </div>
    </Table.Root>
  );
}