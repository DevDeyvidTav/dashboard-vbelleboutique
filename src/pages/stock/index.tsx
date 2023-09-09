import { Aside } from '@/components/Aside';
import { StockModal } from '@/components/stockModal';
import { Dialog } from '@radix-ui/themes';
import axios from 'axios';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiFillShop } from 'react-icons/ai';
import { FiLogOut, FiSearch } from 'react-icons/fi';
import { RiAddBoxFill, RiCloseLine, RiMenuLine, RiAddCircleLine, RiStockLine, RiAddBoxLine } from 'react-icons/ri';

type Product = {
    id?: string,
    name?: string,
    imageUrl: string,
    description?: string,
    price?: number
}

type Category = {
    id: string,
    name: string
}

export default function StockManagement() {
    const [selectedProduct, setSelectedProduct] = useState<Product>();
    const [categories, setCategories] = useState<Category[]>()
    const [products, setProducts] = useState<Product[]>();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const productImage = selectedProduct ? selectedProduct.imageUrl : "/logo.png";
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    async function getCategories() {
        try {
            const response = await axios.get('/api/get_categories')
            const data = await response.data
            setCategories(data)
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message)
            }
        }
    }

    async function getProducts() {
        try {
            const response = await axios.get('/api/get_products', {
                params: {
                    categoryId: selectedCategory,
                    searchQuery: searchQuery
                }
            })
            setProducts(response.data)
        } catch (error) {
            if (error instanceof axios.AxiosError) {
                console.error(error.response?.data.message)
            }
        }
    }

    useEffect(() => {
        if (!categories) {
            getCategories()
        }
    }, [])

    useEffect(() => {
        getProducts()
    }, [selectedCategory, searchQuery])
    const router = useRouter()


    return (
        <Dialog.Root>
            <StockModal imageUrl={productImage} name={selectedProduct?.name} id={selectedProduct?.id} description={selectedProduct?.description} />
            <main className={`bg-[#f0e7db] min-h-screen max-w-full w-screen`}>
                <header className='lg:hidden z-50 bg-white fixed w-full p-4 shadow-md flex justify-between items-center'>
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
                    <section className={`lg:w-3/4 flex flex-col items-center space-y-8 p-4 lg:ml-1/4 lg:mr-4 ${isMenuOpen ? 'lg:ml-0' : ''}`}>
                        <h2 className='text-3xl font-bold text-[#955764] mt-14'>Gerenciamento de Estoque</h2>
                        <div className='flex flex-col-reverse  items-center mt-10 gap-4 p-4'>
                            <div className='flex gap-2 items-center'>
                                <label className='text-[#955764]'>Filtrar por Categoria:</label>
                                <select
                                    className='bg-white rounded-md px-2  py-1 focus:outline-none focus:ring focus:border-[#955764]'
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="">
                                        Todos
                                    </option>
                                    {categories?.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='relative'>
                                <input
                                    type='text'
                                    placeholder='Pesquisar'
                                    className='bg-[#f8f5f1] text-black rounded-md py-1 px-3 focus:outline-none focus:ring-2 focus:ring-[#955764]'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <span className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                                    <FiSearch />
                                </span>
                            </div>
                        </div>

                        <div className='flex flex-wrap justify-center gap-4 overflow-x-auto'>
                            {products?.map((product) => (
                                <div key={product.id} className='w-64 bg-white rounded-md shadow-md'>
                                    <Image className='w-full h-48 object-cover rounded-t-md' width={200} height={200} src={product.imageUrl} alt={'Produto'} />
                                    <div className='p-4'>
                                        <h3 className='text-lg font-bold text-[#955764]'>{product.name}</h3>
                                        <p className='text-[#955764]'>R$ {product.price && product.price.toFixed(2)}</p>
                                        <p className='text-gray-500'>{product.description}</p>
                                    </div>
                                    <div className='flex justify-end p-2'>
                                        <Dialog.Trigger>
                                            <button
                                                onClick={() => setSelectedProduct(product)}
                                                className='text-[#955764] hover:text-[#784d60] transition-colors duration-300'
                                                title='Editar'
                                            >
                                                <RiAddBoxFill />
                                            </button>
                                        </Dialog.Trigger>


                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <aside className={`lg:hidden w-3/4 flex flex-col h-screen ${isMenuOpen ? 'translate-x-0 shadow-2xl shadow-black' : '-translate-x-full'} bg-white p-4 justify-between fixed top-16 left-0  transition-transform duration-500 ease-in-out`}>
                        <ul className='text-[#955764] space-y-2'>
                            <li>
                                <Link className='flex items-center hover:text-[#784d60] transition-colors duration-300' href='/home'>
                                    <AiFillShop className='mr-2' /> Controle de produtos
                                </Link>
                            </li>
                            <li>
                                <Link className='flex items-center hover:text-[#784d60] transition-colors duration-300' href='/create_product'>
                                    <RiAddCircleLine className='mr-2' /> Cadastre um Produto
                                </Link>
                            </li>
                            <li>
                                <Link className='flex items-center hover:text-[#784d60] transition-colors duration-300' href='/stock'>
                                    <RiStockLine className='mr-2' /> Estoque
                                </Link>
                            </li>
                            <li>
                                <Link className='flex items-center hover:text-[#784d60] transition-colors duration-300' href='/categories'>
                                    <RiAddBoxLine className='mr-2' /> Crie uma Nova Categoria
                                </Link>
                            </li>
                        </ul>
                        <button 
                        onClick={() => router.push('/')}
                        className='flex items-center mb-16 text-[#955764] hover:text-red-500  transition-colors duration-300'>
                            <FiLogOut className='mr-2' /> Encerrar Sessão
                        </button>
                    </aside>
                </div>

            </main>

        </Dialog.Root>
    );
}
