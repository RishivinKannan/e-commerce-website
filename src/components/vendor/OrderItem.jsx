/* eslint-disable react/prop-types */
import { useGetProductQuery } from "../../Redux/api/productsDjango";
import { usePostDispatchOrderMutation } from "../../Redux/api/vendorOrderApi";
import { BACKEND_URL } from "../../utils/constants";

const OrderItem = ({ id, productId, qty, price, is_dispatch }) => {
  const { data: product } = useGetProductQuery(productId);
  const [postDispatch] = usePostDispatchOrderMutation();

  return (
    <div className="w-full grid grid-cols-2 shadow-xl p-4 rounded">
      <div className="flex gap-2">
        <img
          src={
            product?.ImageURL?.includes("http")
              ? product?.ImageURL
              : BACKEND_URL + product?.ImageURL
          }
          className="min-w-16 min-h-16 max-16 max-h-16 lg:min-w-20 lg:min-h-20  lg:max-20 lg:max-h-20 rounded-lg shadow-lg "
        />
        <div className=" flex flex-col flex-wrap justify-around  ">
          <h2 className="text-base md:text-lg leading-5 font-semibold pl-2 min-w-56 md:min-w-80">
            {product?.ProductTitle}
          </h2>
          <span className="text-base  pl-2 font-extrabold tracking-wide text-gray-900">
            {qty} X {price}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center">
        {is_dispatch ? (
          <span className="text-base pl-2 font-extrabold text-green-600">
            Dispatched
          </span>
        ) : (
          <button
            onClick={() => postDispatch(id)}
            className="w-28 flex justify-center items-center gap-2 rounded py-2 px-2 md:px-6 text-white bg-darker text-sm font-bold tracking-wider hover:outline outline-gray-500"
          >
            Dispatch
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderItem;
