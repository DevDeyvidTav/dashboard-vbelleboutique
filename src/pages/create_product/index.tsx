import { storage } from '@/lib/firebase';
import { createProduct } from '@/useCases/product';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { RiImageAddLine } from 'react-icons/ri';

const montSerrat = Montserrat({ subsets: ['latin'] });
export default function Home() {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('26c280db-c100-45ab-87b0-7e1ddb0e63e8');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState<string>();
  const [imgUrl, setImgUrl] = useState("")
  const [progress, setProgress] = useState(0)
  const router = useRouter(); // Inicializando o useRouter
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setImagePreview(blobUrl);
    }
  };

  const handleUpload = (e: any) => {
    e.preventDefault()

    const file = e.target[0]?.files[0]
    if (!file) return

    const storageRef = ref(storage, `images/${file.name}`)

    const uploadTask = uploadBytesResumable(storageRef, file)
  
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress)
      },
      error => {
        alert(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL)
        })
      }
    )
  }
 
  const handleProductRegister = async (e: any) => {
    e.preventDefault()
    handleUpload(e)
    if (!imagePreview) {
      alert ('por favor, selecione uma imagem para o produto')
    }
    const product = {
      name: productName,
      imageUrl: imgUrl,
      description: description,
      price: Number(price),
      categoryId: category
    }
   if (imgUrl) {
    const response = await createProduct(product)
    return response
  }
  }
  return (
    <main className={`bg-[#f0e7db] min-h-screen flex flex-col justify-center items-center ${montSerrat.className}`}>
    <div className='flex flex-col items-center space-y-8'>
      <h2 className='text-[#955764] text-2xl font-bold mb-4 uppercase'>Cadastro de Produtos</h2>
    </div>
    <form onSubmit={handleProductRegister} className='w-[90%] max-w-sm mt-8'>
      <div className='flex flex-col space-y-4'>
        <label htmlFor='image' className='text-[#955764] text-sm font-medium'>
          Imagem
        </label>
        <div className='relative'>
          <label htmlFor='image-input' className='cursor-pointer'>
            <RiImageAddLine className='h-8 w-8 text-[#955764]' />
          </label>
          <input
            type='file'
            id='image-input'
            className='hidden'
            accept='image/*'
            onChange={handleImageChange}
          />
          {imagePreview && <Image className='w-32 h-32 rounded-full' width={200} height={200}  src={imagePreview} alt='Preview' />}
        </div>
        <label htmlFor='productName' className='text-[#955764] text-sm font-medium'>
          Nome do Produto
        </label>
        <input
          required
          type='text'
          id='productName'
          className='bg-[#f8f5f1] text-black rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#955764]'
          placeholder='Nome do produto'
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <label htmlFor='price' className='text-[#955764] text-sm font-medium'>
          Preço
        </label>
        <input
          required
          type='text'
          id='price'
          className='bg-[#f8f5f1] text-black rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#955764]'
          placeholder='Preço'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label htmlFor='category' className='text-[#955764] text-sm font-medium'>
          Categoria
        </label>
        <select
          required
          id='category'
          className='bg-[#f8f5f1] text-black rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#955764]'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value=''>Selecione a categoria</option>
          <option value='26c280db-c100-45ab-87b0-7e1ddb0e63e8'>vestido</option>
        </select>
        <label htmlFor='description' className='text-[#955764] text-sm font-medium'>
          Descrição
        </label>
        <textarea
          id='description'
          className='bg-[#f8f5f1] text-black rounded-md w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#955764]'
          placeholder='Descrição do produto'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button
        type='submit'
        className='bg-[#955764] text-white rounded-md w-full py-2 mt-4 focus:outline-none hover:bg-[#784d60] transition-colors duration-300 ease-in-out'
      >
        Cadastrar Produto
      </button>
      <button
          type='button'
          onClick={() => router.push('/home')} // Redirecionando para '/home' ao clicar
          className='bg-[#784d60] text-white rounded-md w-full py-2 mt-2 focus:outline-none hover:bg-[#6e4252] transition-colors duration-300 ease-in-out'
        >
          Voltar
        </button>
    </form>
  </main>
  );

}
