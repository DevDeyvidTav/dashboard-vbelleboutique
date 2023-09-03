import Link from 'next/link';
import { RiAddCircleLine, RiStockLine, RiAddBoxLine } from 'react-icons/ri';
import { FiLogOut } from 'react-icons/fi'; // Importe o ícone de encerrar sessão
import Image from 'next/image';
import { AiFillShop } from 'react-icons/ai';
import { Router, useRouter } from 'next/router';

const Aside = () => {
  const router = useRouter()
  return (
    <aside className='lg:w-1/4 bg-white p-4 rounded-md lg:h-screen hidden lg:flex flex-col w-full  shadow-xl'>
      <div className='flex items-center gap-10'>
        <div className='w-20 h-20 flex items-center justify-center rounded-full shadow-lg mb-4'>
          <Image
            width={100}
            height={100}
            alt="logo da empresa"
            src="/logo.png" />
        </div>
        <h2 className='text-xl font-bold text-[#955764]'>
          V. Belle Boutique
        </h2>
      </div>
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
      <div className='mt-auto'>
        <button
        onClick={() => router.push('/')}
        className='flex items-center hover:text-red-500 transition-colors duration-300'>
          <FiLogOut className='mr-2' /> Encerrar Sessão
        </button>
      </div>
    </aside>
  );
};

export { Aside };
