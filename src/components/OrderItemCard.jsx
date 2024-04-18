/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useGetProductQuery } from "../Redux/api/productsDjango";
import { BACKEND_URL } from "../utils/constants";

const OrderItemCard = ({ productId, price, qty, is_dispatch,is_delivered }) => {
  const { data: products } = useGetProductQuery(productId);
  return (
    <div className="w-full grid grid-cols-2 shadow-xl p-4 rounded-xl bg-white">
      <Link to={`/product/${productId}`}>
        <div className="flex gap-2">
          <img
            src={
              products?.ImageURL?.includes("http")
                ? products?.ImageURL
                : BACKEND_URL + products?.ImageURL
            }
            className="min-w-16 min-h-16 max-16 max-h-16 lg:min-w-20 lg:min-h-20  lg:max-20 lg:max-h-20 rounded-lg shadow-lg "
          />
          <div className=" flex flex-col flex-wrap justify-around  ">
            <h2 className="text-base md:text-lg leading-5 font-semibold pl-2 min-w-56 md:min-w-80">
              {products?.ProductTitle}
            </h2>
            <span className="text-base md:text-lg pl-2 font-extrabold tracking-widest text-gray-900">
              {qty} X {price}
            </span>
          </div>
        </div>
      </Link>
      <div className="flex flex-col items-end justify-center">
        {is_dispatch && !is_delivered ? (
          <span className="text-green-500 text-sm lg:text-base font-semibold">
            Dispatched
          </span>
        ) : (
          <span className="text-gray-700 text-sm lg:text-base font-semibold">
            Yet to be dispatch
          </span>
        )}
      </div>
    </div>
  );
};

export default OrderItemCard;
