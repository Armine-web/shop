import Pagination from "../components/Pagination"
import ExclusiveDiscounts from "@/components/ExclusiveDiscounts";


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



export default async function HomePage() {
  
  const res = await fetch(`https://fakestoreapi.com/products`, {next:{revalidate: 60}});
  if(!res.ok) throw new Error("Fetching feild");
  const data: Product[] = await res.json();


  return (
   <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-6 uppercase">One Store. Endless Occasions</h1>
      <ExclusiveDiscounts />
      <h2 className="w-fit mx-auto text-3xl font-bold text-center bg-blue-600 my-8 py-3 px-6 text-amber-50 disply-block rounded-xl">There you can find what you want</h2>
      <Pagination products={data}/>

   </div>
  );
}
