import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

import { useSearchParams } from "react-router-dom";

export default function SearchPage() {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const categoryName = searchParams.get("name");

  useEffect(() => {
    axios.get("./fashionProducts.json").then((res) => setProducts(res.data));
  }, []);

  return (
    <>
      <div className="pt-20">
        <div className="lg:w-64 lg:h-screen flex justify-center bg-lightest fixed  px-4 py-8 shadow-lg font-extrabold">
          Under Development
        </div>
        <div className="px-6 py-8 lg:pl-72 space-y-4 bg-gray-100 min-h-screen">
          <h1 className="font-semibold text-lg ">
            Category of{" "}
            <span className="text-xl font-normal p-2 text-gray-600">
              {categoryName?.replace(/-/g, " ")}
            </span>
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {products
              .filter((product) =>
                categoryName == "Foot-Wear"
                  ? product.Category.toLowerCase().includes(
                      categoryName?.replace(/-/g, "").toLowerCase()
                    )
                  : product.SubCategory.toLowerCase().includes(
                      categoryName
                        ? categoryName.replace(/-/g, "").toLowerCase()
                        : " "
                    )
              )
              .slice(0, 30)
              .map((product) => {
                return (
                  <ProductCard
                    key={product.ProductId}
                    id={product.ProductId}
                    imageUrl={product.ImageURL}
                    title={product.ProductTitle}
                    rating={4}
                    showFav
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
