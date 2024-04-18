
import { BACKEND_URL } from "../utils/constants.js";
import { useGetProductQuery } from "../Redux/api/productsDjango.js";

// eslint-disable-next-line react/prop-types
export default function CheckoutProduct({ productId, qty, price }) {
  const { data: product, isLoading } = useGetProductQuery(productId);

  return isLoading ? null : (
    <div className="w-full py-5 px-3 flex flex-col gap-4 md:flex-col lg:flex-row lg:justify-between rounded-lg shadow-xl bg-gray-50 ">
      <div className="flex gap-2">
        <img
          src={
            product?.ImageURL?.includes("http")
              ? product?.ImageURL
              : BACKEND_URL + product?.ImageURL
          }
          className="min-w-20 min-h-20 max-20 max-h-20 rounded-lg shadow-lg"
        />
        <div className=" flex flex-col flex-wrap justify-around  ">
          <h2 className="text-lg  leading-5 font-semibold sm:tracking-wider pl-2 ">
            {product?.ProductTitle}
          </h2>

            <span className="text-blue-700 text-lg pl-2 font-extrabold tracking-wide">
              <span className="text-gray-500">{qty} x </span>  ₹{price}
            </span>
        </div>
      </div>
    </div>
  );
}
