import Pagination from "../components/Pagination"

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

      <Pagination products={data}/>

   </div>
  );
}
