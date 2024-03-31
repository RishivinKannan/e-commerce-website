import ProductCard from "./ProductCard";
import ProductCardShimmer from "./ProductCardShimmer";
import { useSearchParams } from "react-router-dom";
import { useGetAllProductsQuery } from "../Redux/api/products";
import { Tooltip } from "@mui/material";
import { Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { CloseIcon, MenuIcon } from "../utils/Icons";
export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [filterBtn, setFilterBtn] = useState(false);
  const query = searchParams.get("query");
  const { data: products, isLoading } = useGetAllProductsQuery();

  return (
    <>
      <div className="pt-20">
        <Transition appear show={filterBtn} as={Fragment}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-64 md:-translate-x-10"
            enterTo="opacity-100  md:translate-x-0"
            leave="ease-in duration-300 md:duration-50"
            leaveFrom="opacity-100 md:translate-x-0"
            leaveTo="opacity-0 translate-y-64 md:-translate-x-10"
          >
            <div className="z-30 translate-y-10 md:translate-y-0 rounded-t-3xl md:rounded-none w-full h-full md:w-52 lg:w-64 md:h-screen  bg-lightest fixed  px-4 py-8 shadow-lg font-extrabold">
              <div className="flex justify-between">
                <span>Filters</span>
                <span onClick={() => setFilterBtn(false)}>
                  <CloseIcon className="w-7 cursor-pointer" />
                </span>
              </div>
            </div>
          </Transition.Child>
        </Transition>
        <div
          className={`px-6 py-8  space-y-4 bg-gray-100 min-h-screen  ${
            filterBtn && "md:pl-56 lg:pl-72"
          }`}
        >
          <h1 className="flex items-center font-semibold text-lg ">
            <Tooltip arrow={true} title={"Filters"}>
              <span
                className="pr-6 cursor-pointer"
                onClick={() => setFilterBtn((prev) => !prev)}
              >
                <MenuIcon className="w-8" />
              </span>
            </Tooltip>
            Search results of
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
