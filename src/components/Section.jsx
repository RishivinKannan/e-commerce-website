/* eslint-disable react/prop-types */
import ProductCard from "./ProductCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home({ Heading, ProductUrl }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(ProductUrl).then((res) => setProducts(res.data));
  }, [ProductUrl]);

  return (
    <section className="w-full py-16 px-6  flex flex-col">
      <h1 className="text-3xl font-extrabold tracking-wider px-7">{Heading}</h1>
      <div className="px-4 pb-4 pt-8 grid grid-cols-2 lg:max-2xl:grid-cols-4">
        {products == []
          ? "LOADING"
          : products.map((product) => (
              <ProductCard
                key={product.ProductId}
                imageUrl={product.ImageURL}
                title={product.ProductTitle}
                category={product.Category}
              />
            ))}
      </div>
    </section>
  );
}
