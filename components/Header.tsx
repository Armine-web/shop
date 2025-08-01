import React from 'react'

export default function Header() {
  return (
    <div className="bg-black text-white px-6 py-3 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold tracking-widest">EASY SHOP</h1>
      <div className="flex gap-4 text-sm">
        <span className="underline">Home</span>
        <span className="hover:underline">Cart</span>
        <span className="hover:underline">Login</span>
        <span className="hover:underline">Signup</span>
        <span className="hover:underline">News</span>
        <span className="hover:underline">About</span>
      </div>
      
    </div>
  )
}
