import Link from 'next/link';
import { RiAddCircleLine, RiStockLine, RiAddBoxLine } from 'react-icons/ri';
import { FiLogOut } from 'react-icons/fi'; // Importe o ícone de encerrar sessão

const Aside = () => {
  return (
    <aside className='lg:w-1/4 bg-white p-4 rounded-md lg:h-screen hidden lg:flex flex-col w-full fixed shadow-md'>
      <h2 className='text-[#955764] text-lg font-bold mb-4'>Opções</h2>
      <ul className='text-[#955764] space-y-2'>
        <li>
          <Link className='flex items-center hover:text-[#784d60] transition-colors duration-300' href='/cadastro-produto'>
            <RiAddCircleLine className='mr-2' /> Cadastre um Produto
          </Link>
        </li>
        <li>
          <Link className='flex items-center hover:text-[#784d60] transition-colors duration-300' href='/estoque'>
            <RiStockLine className='mr-2' /> Estoque
          </Link>
        </li>
        <li>
          <Link className='flex items-center hover:text-[#784d60] transition-colors duration-300' href='/nova-categoria'>
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
  );
};

export { Aside };
