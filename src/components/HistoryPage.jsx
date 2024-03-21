import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { gethistoryList } from "../Redux/services/historySlice";

const FavouritePage = () => {
  const [products, setProducts] = useState([]);
  const { historyList } = useSelector((state) => state.history);
  const { username } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("./fashionProducts.json").then((res) => setProducts(res.data));
    dispatch(gethistoryList({ username }));
  }, [username, dispatch]);

  return (
    <>
      <div className="pt-28 px-6  bg-gray-100 space-y-10 min-h-screen">
        <div>
          <span className="text-2xl font-extrabold tracking-wider leading-9 [text-shadow:1px_1px_3px_var(--tw-shadow-color)] shadow-gray-600">
            History
          </span>
          <button
            className="p-2 text-lg bg-red-600 text-white rounded-md float-right"
            onClick={() => {
              localStorage.setItem(
                `${username}-historyList`,
                JSON.stringify([])
              );
            }}
          >
            Delete All
          </button>
        </div>
        {historyList.length == 0 ? (
          <div className="flex justify-center items-center p-32">
            <h1 className="text-2xl font-bold tracking-wider text-zinc-600">
              No History
            </h1>
          </div>
        ) : (
          <div className="grid gap-y-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
            {products
              .filter((product) =>
                historyList.includes(product.ProductId.toString())
              )
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
        )}
      </div>
    </>
  );
};

export default FavouritePage;
