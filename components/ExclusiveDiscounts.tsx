'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

type Product = {
  id: number
  title: string
  price: number
  image: string
}

export default function ExclusiveDiscounts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products')
        const data: Product[] = await res.json()

        const cheapest = data
          .sort((a, b) => a.price - b.price)
          .slice(0, 3)

        setProducts(cheapest)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) return <p className="text-center">Loading discounts...</p>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-red-800">Today’s Best Deals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 ">
        
        {products.map((product) => (
        <Link href={`/product/${product.id}`} key={product.id}>
            <div className="rounded-lg p-4 shadow hover:p-8 shadow-red-200 hover:shadow-md transition min-h-[300px]">
            <img
                src={product.image}
                alt={product.title}
                className="h-40 mx-auto object-contain"
            />
            <h3 className="text-sm mt-2 font-semibold text-gray-800">
                {product.title}
            </h3>
            <p className="text-green-600 font-bold mt-1">
                ${product.price.toFixed(2)}
            </p>
            </div>
        </Link>
        ))}
        
      </div>
    </div>
  )
}

