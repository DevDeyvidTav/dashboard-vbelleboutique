import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { AiFillDelete } from 'react-icons/ai';

type Category = {
  id: string,
  name: string
}
const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>();
  const router = useRouter();
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
  return (
    <div className='bg-[#f0e7db] min-h-screen flex flex-col justify-center items-center'>
      <div className='bg-white p-6 rounded-md shadow-md w-[90%] max-w-md'>
        <h2 className='text-[#955764] text-2xl font-bold mb-4'>Lista de Categorias</h2>
        <ul className='text-[#955764] space-y-2'>
          {categories?.map((category) => (
            <li className='flex' key={category.id}>
              <p
                // Redirecionar para a página de detalhes da categoria
                className='w-full text-left hover:text-[#784d60] transition-colors duration-300'
              >
                {category.name}

              </p>
              <AiFillDelete/>
            </li>
          ))}
        </ul>
        <button
          onClick={() => router.push('/categories/create')} // Redirecionar para a página de cadastro de categoria
          className='bg-[#955764] text-white rounded-md w-full py-2 mt-4 focus:outline-none hover:bg-[#784d60] transition-colors duration-300 ease-in-out'
        >
          Cadastrar Nova Categoria
        </button>
        <button
          onClick={() => router.push('/home')} // Redirecionar para a página de cadastro de categoria
          className='bg-[#955764] text-white rounded-md w-full py-2 mt-4 focus:outline-none hover:bg-[#784d60] transition-colors duration-300 ease-in-out'
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default CategoryList;
