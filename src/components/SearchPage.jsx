import { useState,useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

export default function SearchPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("./searchResults.json").then((res) => setProducts(res.data));
  }, []);

  return (
    <>
      <div className="pt-20">
        <div className="lg:w-64 lg:h-screen flex justify-center bg-lightest fixed  p-4 shadow-lg font-extrabold">
          Under Development
        </div>
        <div className="p-6 lg:pl-72 space-y-4 bg-gray-100">
          <h1 className="font-semibold text-lg ">Search Results</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {products.map((product) =>{
                  return <ProductCard
                  key={product.ProductId}
                  imageUrl={product.ImageURL}
                  title={product.ProductTitle}
                  rating={4}
                />
                })}
          </div>
          <div className="p-4">hiiiii</div>
        </div>
      </div>
    </>
  );
}
