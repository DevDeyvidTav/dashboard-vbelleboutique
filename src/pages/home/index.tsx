import { Aside } from '@/components/Aside';
import Link from 'next/link';
import { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { RiEdit2Line, RiDeleteBin5Line, RiCloseLine, RiMenuLine, RiAddCircleLine, RiStockLine, RiAddBoxLine } from 'react-icons/ri';

const productsData = [
    {
        id: 1,
        name: 'Vestido Floral',
        price: '$39.99',
        category: 'Vestidos',
        description: 'Um lindo vestido floral perfeito para o verão.',
        image: '/images/vestido-floral.jpg',
    },
    {
        id: 2,
        name: 'Blusa Listrada',
        price: '$24.99',
        category: 'Blusas',
        description: 'Uma blusa leve e confortável com padrão listrado.',
        image: '/images/blusa-listrada.jpg',
    },
    // Adicione mais produtos aqui
];

const categories = ['Todos', 'Vestidos', 'Blusas', 'Saias', 'Acessórios'];

export default function ProductManagement() {
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar o menu responsivo
    const filteredProducts = selectedCategory === 'Todos' ? productsData : productsData.filter(product => product.category === selectedCategory);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <main className={`bg-[#f0e7db] min-h-screen`}>
            <header className='lg:hidden bg-white p-4 shadow-md flex justify-between items-center'>
                <h2 className='text-[#955764] text-lg font-bold'>V Belle Boutique</h2>
                <button
                    className='text-[#955764] hover:text-[#784d60] transition-colors duration-300'
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? <RiCloseLine /> : <RiMenuLine />}
                </button>
            </header>
            <div className='flex flex-col lg:flex-row'>
                <Aside />
                <section className={`lg:w-3/4 flex flex-col items-center space-y-8 p-4 ${isMenuOpen ? 'lg:ml-0' : 'lg:ml-1/4'}`}>

                    <div className='flex items-center space-x-4 p-4'>
                        <label className='text-[#955764]'>Filtrar por Categoria:</label>
                        <select
                            className='bg-white rounded-md px-2 py-1 focus:outline-none focus:ring focus:border-[#955764]'
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='flex space-x-4 overflow-x-auto'>
                        {filteredProducts.map((product) => (
                            <div key={product.id} className='w-64 bg-white rounded-md shadow-md'>
                                <img className='w-full h-48 object-cover rounded-t-md' src={product.image} alt={product.name} />
                                <div className='p-4'>
                                    <h3 className='text-lg font-bold text-[#955764]'>{product.name}</h3>
                                    <p className='text-[#955764]'>{product.price}</p>
                                    <p className='text-gray-500'>{product.description}</p>
                                </div>
                                <div className='flex justify-end p-2'>
                                    <button
                                        className='text-[#955764] hover:text-[#784d60] transition-colors duration-300'
                                        title='Editar'
                                    >
                                        <RiEdit2Line />
                                    </button>
                                    <button
                                        className='text-[#955764] hover:text-red-500 transition-colors duration-300'
                                        title='Excluir'
                                    >
                                        <RiDeleteBin5Line />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <aside className={`lg:hidden w-3/4 h-screen ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} bg-white p-4 fixed top-16 left-0 shadow-md  duration-500`}>
                    <ul className='text-[#955764] space-y-2'>
                        <li>
                            <Link className='flex items-center hover:text-[#784d60] transition-colors duration-300' href='/create_product
                            '>
                                <RiAddCircleLine className='mr-2' /> Cadastre um Produto
                            </Link>
                        </li>
                        <li>
                            <Link className='flex items-center hover:text-[#784d60] transition-colors duration-300' href='/estoque'>
                                <RiStockLine className='mr-2' /> Estoque
                            </Link>
                        </li>
                        <li>
                            <Link className='flex items-center hover:text-[#784d60] transition-colors duration-300' href='/categories'>
                                <RiAddBoxLine className='mr-2' /> Crie uma Nova Categoria
                            </Link>
                        </li>
                    </ul>
                    <div className='mt-auto'>
                        <button className='flex items-center hover:text-red-500 transition-colors duration-300'>
                            <FiLogOut className='mr-2' /> Encerrar Sessão
                        </button>
                    </div>
                </aside>

            </div>
        </main>
    );
}
