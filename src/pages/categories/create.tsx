import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';

const CategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/category', {
        name: categoryName,
      })
      router.push('/categories');
      toast.success("Categoria cadastrada com sucesso!")
      return response.data

    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
    
  };

  return (
    <div className='bg-[#f0e7db] min-h-screen flex flex-col justify-center items-center'>
      <div className='bg-white p-6 rounded-md shadow-md w-[90%] max-w-md'>
        <h2 className='text-[#955764] text-2xl font-bold mb-4'>Cadastro de Categoria</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='categoryName' className='text-[#955764] text-sm font-medium'>
            Nome da Categoria
          </label>
          <input
            required
            type='text'
            id='categoryName'
            className='bg-[#f8f5f1] text-black rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#955764] mb-4'
            placeholder='Nome da categoria'
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <button
            type='submit'
            className='bg-[#955764] text-white rounded-md w-full py-2 focus:outline-none hover:bg-[#784d60] transition-colors duration-300 ease-in-out'
          >
            Cadastrar Categoria
          </button>
        </form>
        <button
          onClick={() => router.push('/categories')} // Redirecionar de volta para a página de categorias
          className='bg-[#784d60] text-white rounded-md w-full py-2 mt-4 focus:outline-none hover:bg-[#6e4252] transition-colors duration-300 ease-in-out'
        >
          Voltar para Categorias
        </button>
      </div>
    </div>
  );
};

export default CategoryForm;
