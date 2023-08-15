import Image from 'next/image';
import { Montserrat } from 'next/font/google';
import { useState } from 'react';
import { RiEyeLine, RiEyeOffLine, RiMailLine } from 'react-icons/ri';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schemaAuth } from '@/validations/auth';
import { signIn } from '@/lib/firebase';

const montSerrat = Montserrat({ subsets: ['latin'] });

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaAuth),
  });

  return (
    <main className={`bg-[#f0e7db] min-h-screen flex flex-col justify-center items-center ${montSerrat.className}`}>
      <div className='flex flex-col items-center space-y-8'>
        <Image src="/logo.png" width={250} height={100} alt='Logo' />
        <h2 className='text-[#955764] text-xl font-bold uppercase'>Painel de Controle</h2>
      </div>
      <form 
      onSubmit={handleSubmit((data) => signIn(data.email, data.password))}
      className='w-[90%] max-w-sm mt-8'>
        <h2 className='text-[#955764] text-2xl font-bold mb-4 uppercase'>Login</h2>
        <div className='flex flex-col space-y-4'>
          <label htmlFor='email' className='text-[#955764] text-sm font-medium'>
            Endereço de E-mail
          </label>
          <div className='relative'>
            <span className='absolute inset-y-0 left-3 flex items-center pointer-events-none'>
              <RiMailLine className='h-5 w-5 text-[#955764]' />
            </span>
            <input
              {...register('email',{required: true})}
              type='email'
              id='email'
              className='bg-[#f8f5f1] text-black rounded-md w-full py-2 px-10 focus:outline-none focus:ring-2 focus:ring-[#955764]'
              placeholder='Seu e-mail'
            />
          </div>
          <label htmlFor='password' className='text-[#955764] text-sm font-medium'>
            Senha
          </label>
          <div className='relative'>
            <span className='absolute inset-y-0 left-3 flex items-center'>
              <button
                type='button'
                onClick={togglePasswordVisibility}
                className='focus:outline-none'
              >
                {showPassword ? (
                  <RiEyeOffLine className='h-5 w-5 text-[#955764]' />
                ) : (
                  <RiEyeLine className='h-5 w-5 text-[#955764]' />
                )}
              </button>
            </span>
            <input
              {...register('password',{required: true})}
              type={showPassword ? 'text' : 'password'}
              id='password'
              className='bg-[#f8f5f1] text-black rounded-md py-2 w-full px-10 focus:outline-none focus:ring-2 focus:ring-[#955764]'
              placeholder='Sua senha'
            />
          </div>
        </div>
        <button
          type='submit'
          className='bg-[#955764] text-white rounded-md w-full py-2 mt-4 focus:outline-none hover:bg-[#784d60] transition-colors duration-300 ease-in-out'
        >
          Entrar
        </button>
      </form>
    </main>
  );
}
