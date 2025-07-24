import Link from "next/link";

type Products = {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string
}


export default async function HomePage() {
  
  const res = await fetch(`https://fakestoreapi.com/products`, {next:{revalidate: 60}});
  if(!res.ok) throw new Error("Fetching feild");
  const data: Products[] = await res.json();


  return (
   <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">There you can find what you want</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {
    data.map(item => (
      <li key={item.id} className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden p-2 hover:shadow-xl transition-shadow duration-300">
        <Link  href={`/product/${item.id}`}> 
          <img src={item.image} alt={item.title} className="w-full h-48 object-contain" />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-900">{item.title}</h2>
            <p className="text-gray-700 mt-2">Price: <span className="font-bold text-green-600">${item.price}</span></p>
            <p className="text-gray-500 mt-1">Category: {item.category}</p>
          </div>
        </Link>
      </li>
    ))
  }
</ul>
   </div>
  );
}
