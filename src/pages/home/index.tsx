import { Aside } from '@/components/Aside';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { RiEdit2Line, RiDeleteBin5Line, RiCloseLine, RiMenuLine, RiAddCircleLine, RiStockLine, RiAddBoxLine } from 'react-icons/ri';



type Product = {
    id: string,
    name: string,
    imageUrl: string,
    description: string, 
    price: number
}

type Category = {
    id: string,
    name: string
}

export default function ProductManagement() {
    const [categories, setCategories] = useState<Category[]>()
    const [products, setProducts] = useState<Product[]>();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      useEffect(() => {
        if (!categories){
          getCategories()
        }
      }, [])
    async function getProducts() {
        try {
            const response = await axios.get('/api/get_products', {
                params: {
                    categoryId: selectedCategory
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
            getProducts()
    }, [selectedCategory])
    return (
        <main className={`bg-[#f0e7db] min-h-screen max-w-full w-screen`}>
            <header className='lg:hidden bg-white fixed w-full p-4 shadow-md flex justify-between items-center'>
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

                    <div className='flex items-center mt-10 gap-4 p-4'>
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
                    <div className='flex flex-wrap justify-center gap-4  overflow-x-auto'>
                        {products?.map((product) => (
                            <div key={product.id} className='w-64 bg-white rounded-md shadow-md'>
                                <Image className='w-full h-48 object-cover rounded-t-md' width={200}  height={200} src={product.imageUrl} alt={product.name} />
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

                <aside className={`lg:hidden w-full h-screen ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} bg-white p-4 fixed top-16 left-0 shadow-md transition-transform duration-500 ease-in-out`}>
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