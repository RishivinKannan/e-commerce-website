import ProductCard from "./ProductCard";
import ProductCardShimmer from "./ProductCardShimmer";
import { useSearchParams } from "react-router-dom";
import { useGetAllProductsQuery } from "../Redux/api/products";
export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const { data: products, isLoading } = useGetAllProductsQuery();

  return (
    <>
      <div className="pt-20">
        <div className="lg:w-64 lg:h-screen flex justify-center bg-lightest fixed  px-4 py-8 shadow-lg font-extrabold">
          Under Development
        </div>
        <div className="px-6 py-8 lg:pl-72 space-y-4 bg-gray-100 min-h-screen">
          <h1 className="font-semibold text-lg ">
            Search Results for{" "}
            <span className="text-xl font-normal p-2 text-gray-600">
              {query.replace(/-/g, " ")}
            </span>
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {isLoading
              ? Array(10)
                  .fill()
                  .map((x, i) => <ProductCardShimmer key={i} />)
              : products
                  ?.filter((product) =>
                    product.ProductTitle.toLowerCase().includes(
                      query.replace(/-/g, " ").toLowerCase()
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
                        mrp={product?.actual_price}
                        price={product?.discounted_price}
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
