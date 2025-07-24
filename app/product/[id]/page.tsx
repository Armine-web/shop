import React from 'react'

type Product = {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string
}

type Params = {
  params: Promise<{id:string}>
}


export default async function ProductsPage({params}: Params) {

  const { id } = await params;

  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {next: {revalidate: 60}});

  if (!res.ok) throw new Error(`There is no item in id: ${id}`);

  const data:Product = await res.json()

  return (

    <div className='mx-auto'>
      <h1 className="text-2xl font-bold text-gray-800 text-center p-6">{data.title}</h1>
      <div className="max-w-lg mx-auto p-6 bg-white shadow-2xl rounded-lg flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
        <img src={data.image} alt={data.title} className="mt-6 w-2/3 rounded-lg shadow-md object-cover" />
        <p className="mt-2 text-xl text-gray-600">Price: <span className="text-green-500">{data.price}</span></p>
        <p className="mt-1 text-gray-500">Category: {data.category}</p>
        <p className="mt-4 text-gray-700">{data.description}</p>
      </div>
    </div>

  )
}
