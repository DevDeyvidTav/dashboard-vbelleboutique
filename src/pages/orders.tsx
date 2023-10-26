import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { FiCheckCircle } from 'react-icons/fi';
import { RiWhatsappLine } from 'react-icons/ri';

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
  const [isLoading, setIsLoading] = useState(true);
  const [whatsappNumber, setWhatsappNumber] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const updateDeliveryStatus = async (orderId: string) => {
    try {
      await axios.put(`/api/delivery_update?id=${orderId}`);
      // Atualize os pedidos após a atualização ser concluída com sucesso
      fetchDeliveryOrders();
    } catch (error) {
      console.error(error);
      // Lide com erros e forneça feedback visual
    }
  };

  async function fetchDeliveryOrders() {
    try {
      const response = await axios.get('/api/get_order');
      const data = response.data;

      const formattedOrders = data.map((order: any) => {
        const orderDetails = JSON.parse(order.orderDetail);
        const phoneNumber = orderDetails.address.phoneNumber;
        if (!whatsappNumber) {
          setWhatsappNumber(phoneNumber);
        }
        return {
          id: order.id,
          details: orderDetails,
        };
      });

      setOrders(formattedOrders);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      // Lide com erros e forneça feedback visual
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
          <div key={order.id} className="bg-white p-4 shadow-md rounded-lg transition-transform hover:scale-105">
            <h2 className="text-lg font-bold text-[#955764] mb-2">Detalhes do Pedido</h2>
            <p>Entrega: {order.details.delivered ? 'Concluída' : 'Pendente'}</p>
            {order.details.delivered ? (
              <button className="bg-gray-200 text-gray-500 cursor-not-allowed" disabled>
                Pedido Entregue
              </button>
            ) : (
              <button
                className="bg-[#955764] text-white p-2 rounded-md mt-2 flex items-center"
                onClick={() => updateDeliveryStatus(order.id)}
              >
                <FiCheckCircle className="mr-2" /> Pedido Entregue
              </button>
            )}
            <hr className="my-4 border-t border-[#dcd3c1]" />
            <div className="mb-4">
              <h3 className="text-lg font-bold text-[#955764]">Informações do Cliente</h3>
              <p>Nome: {order.details.address.name}</p>
              <p>Telefone: {order.details.address.phoneNumber}</p>
              <p>Endereço: {order.details.address.street}, {order.details.address.number}</p>
              <p>Complemento: {order.details.address.complement}</p>
              <p>Cidade: {order.details.address.city}</p>
              {whatsappNumber && !isLoading && (
                <a
                  href={`https://api.whatsapp.com/send?phone=55${whatsappNumber}`}
                  target="_blank"
                  className="bg-[#25d366] text-white p-2 rounded-md mt-2 flex items-center hover:bg-[#128c7e] transition-background"
                >
                  <RiWhatsappLine className="mr-2" /> Entrar em contato
                </a>
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#955764]">Produtos</h3>
              <ul>
                {order.details.cart.map((product) => (
                  <li key={product.id} className="hover:bg-[#f7f3ee] transition-background p-2 rounded-lg">
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
      <Link href="/home" className="text-white bg-[#955764] text-lg mt-4 py-2 px-4 rounded-full hover:bg-[#7e4f55] transition-background">
        Voltar
      </Link>
    </main>
  );
}
