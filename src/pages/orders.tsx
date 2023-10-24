import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

type Order = {
  id: string;
  details: {
    delivered: boolean;
    address: {
      city: string;
      complement: string;
      name: string;
      number: string;
      paymentMethod: string;
      phoneNumber: string;
      state: string;
      street: string;
      zipCode: string;
    };
    cart: Product[];
  };
};

type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  size: string;
};

export default function DeliveryOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  async function fetchDeliveryOrders() {
    try {
      const response = await axios.get('/api/get_order');
      const data = response.data;

      // Mapeie os dados para o formato desejado
      const formattedOrders = data.map((order: any) => ({
        id: order.id,
        details: JSON.parse(order.orderDetail),
      }));

      setOrders(formattedOrders);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchDeliveryOrders();
  }, []);

  return (
    <main className="bg-[#f0e7db] min-h-screen flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-[#955764] mt-8">Pedidos para Entrega</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-bold text-[#955764] mb-2">Detalhes do Pedido</h2>
            <p>Entrega: {order.details.delivered ? 'Concluída' : 'Pendente'}</p>
            <hr className="my-4 border-t border-[#dcd3c1]" />
            <div className="mb-4">
              <h3 className="text-lg font-bold text-[#955764]">Informações do Cliente</h3>
              <p>Nome: {order.details.address.name}</p>
              <p>Telefone: {order.details.address.phoneNumber}</p>
              <p>Endereço: {order.details.address.street}, {order.details.address.number}</p>
              <p>Complemento: {order.details.address.complement}</p>
              <p>Cidade: {order.details.address.city}</p>
            </div>
            <div>
    <h3 className="text-lg font-bold text-[#955764]">Produtos</h3>
    <ul>
      {order.details.cart.map((product) => (
        <li key={product.id}>
          <div className="flex items-center">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-12 h-12 object-cover mr-4"
            />
            {product.name} - Quantidade: {product.quantity} - Preço: R${product.price.toFixed(2)} - Tamanho: {product.size}
          </div>
        </li>
      ))}
    </ul>
  </div>
          </div>
        ))}
      </div>
      <Link href="/home" className="text-[#955764] text-lg mt-4">
        Voltar
      </Link>
    </main>
  );
}
