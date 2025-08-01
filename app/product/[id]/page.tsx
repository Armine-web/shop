import React from 'react'
import StarRating from '@/components/StarRating'

type Product = {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  rating: {
    rate: number,
    count: number
  }
}

type Params = {
  params: Promise<{ id: string }>
}


export default async function ProductsPage({ params }: Params) {
  const { id } = await params;

  const res = await fetch(`https://fakestoreapi.com/products/${id}`, { next: { revalidate: 60 } });

  if (!res.ok) throw new Error(`There is no item in id: ${id}`);

  const data: Product = await res.json();

  return (
    <div className='mx-auto'>
      <h1 className="text-2xl font-bold text-gray-800 text-center p-6">{data.title}</h1>
      <div className="max-w-lg mx-auto p-6 bg-white shadow-2xl rounded-lg flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
        <div className='flex justify-center'>
          <img src={data.image} alt={data.title} className="mt-6 w-2/3 rounded-lg object-cover" />
        </div>
        <div className="mt-4">
          <div className='flex justify-between items-center'>
            <p className="text-xl text-gray-600">Price: <span className="text-green-500">${data.price}</span></p>
            <p className="text-lg text-gray-600 p-1">Count: {data.rating.count}</p>
          </div>
          <div className='w-full flex justify-center mt-2'>
            <StarRating rate={data.rating.rate} id={data.id}/>
          </div>
        </div>
        <div className='w-full flex flex-col justify-start mt-4'>
          <p className="text-gray-500">Category: {data.category}</p>
          <p className="mt-4 text-gray-700">{data.description}</p>
        </div>
      </div>
    </div>
  )
}
