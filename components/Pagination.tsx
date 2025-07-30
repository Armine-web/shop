'use client'
import React from 'react'
import {useState, useMemo } from 'react'
import Link from "next/link";
import StarRating from './StarRating';

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

type Props = {
    products: Product[];
}


export default function Pagination({products}: Props) {
    const [page, setPage] = useState(1);
    const itemsPerPage = 8;


    const totalPages = Math.ceil(products.length / itemsPerPage);

    const current = useMemo(()=> {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return products.slice(start, end);
    }, [page, products]);


        const prev = () => { setPage(p => Math.max(1, p-1))};
        const next = () => { setPage(p => Math.min(totalPages, p+1))};

        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
          }
    
  return (
    <div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {
                current.map(item => 
                    <li key={item.id} className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden p-2 hover:shadow-xl transition-shadow duration-300">
                        <Link  href={`/product/${item.id}`}> 
                        <img src={item.image} alt={item.title} className="w-full h-48 object-contain" />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-gray-900">{item.title}</h2>
                              <StarRating rate={item.rating.rate} />
                              <p className="text-lg text-gray-600"> Count: {item.rating.count} </p>
                              <p className="mt-2 text-xl text-gray-600">Price: <span className="text-green-500">{item.price}</span></p>
                              <p className="mt-1 text-gray-500">Category: {item.category}</p>
                        </div>
                        </Link>
                    </li>
                )
            }
        </ul>


      <div className='mx-auto w-max p-4 flex justify-center'>

        <button onClick={prev} disabled = {page === 1}
        className={`px-4 py-2  text-gray-700 hover:text-orange-700 transition ${
                    page === 1 ? 'opacity-1 cursor-not-allowed' : ''}` }
        >
          ← prev
        </button>

        <span className="mx-4 text-lg font-medium text-gray-800 flex gap-2">
          {pages.length > 3 ? 
          (
            <>
              <button
                onClick={() => setPage(1)}
                className={`px-4  text-sm ${
                  page === 1
                    ? "text-orange-800"
                    : " text-gray-800  hover:bg-orange-200 rounded-3xl" }`}
              >
                1
              </button>

              {page > 3 && <span className="px-2 text-gray-500">...</span>}

              {[page - 1, page, page + 1]
                .filter((pg) => pg > 1 && pg < totalPages)
                .map((pg) => (
                  <button
                    key={pg}
                    onClick={() => setPage(pg)}
                    className={`px-4  text-sm ${
                      page === pg
                        ? "text-orange-800"
                        : " text-gray-800  hover:bg-orange-200 rounded-3xl" }`}
                  >
                    {pg}
                  </button>
                ))}

              
              {page < totalPages - 2 && <span className="px-2 text-gray-500">...</span>}

              {totalPages > 1 && (
                <button
                  onClick={() => setPage(totalPages)}
                  className={`px-4 text-sm ${
                    page === totalPages
                      ? "text-orange-800"
                      : " text-gray-800  hover:bg-orange-200 rounded-3xl" }`}
                >
                  {totalPages}
                </button>
              )}
            </>

          ) : (
          
            pages.map((pg) => (
              <button
                key={pg}
                onClick={() => setPage(pg)}
                className={`px-3 py-1 rounded text-sm ${
                  page === pg
                    ? 'text-orange-800'
                    : 'text-gray-800  hover:bg-gray-100' }`}
              >
                {pg}
              </button>
            ))
          )}
        </span>

        <button onClick={next} disabled = {page === totalPages} 
          className={`px-4 py-2  text-gray-700 hover:text-orange-700 transition ${
          page === totalPages ? 'opacity-1 cursor-not-allowed' : '' }`
          }>
          next →
        </button>

      </div>

    </div>
    
  )
}
