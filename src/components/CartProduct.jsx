import { DeleteIcon } from "../utils/Icons.jsx";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  decrementqty,
  deleteitem,
  incrementqty,
} from "../Redux/services/cartSlice.js";
import { BACKEND_URL } from "../utils/constants.js";
import { useGetProductQuery } from "../Redux/api/productsDjango.js";
import {
  useDecrementQtyMutation,
  useDeleteItemMutation,
  useIncrementQtyMutation,
} from "../Redux/api/cartApi.js";

// eslint-disable-next-line react/prop-types
export default function CartProduct({ productId, qty, price }) {
  // const [product, setProduct] = useState([]);
  const [qtyState, setQtyState] = useState(qty);
  const { username, isLogged } = useSelector((state) => state.user);
  const { data: product, isLoading } = useGetProductQuery(productId);
  const dispatch = useDispatch();

  const [decrementQtyApi] = useDecrementQtyMutation();
  const [incrementQtyApi] = useIncrementQtyMutation();
  const [deleteItemApi] = useDeleteItemMutation();
  // useEffect(() => {
  //   axios.get("../fashionProducts.json").then((res) => {
  //     setProduct(res.data.filter((data) => data.ProductId.toString() == id));
  //   });
  // }, [id]);

  function increment(e) {
    e.preventDefault();
    if (qty <= 10) {
      setQtyState((prev) => prev + 1);
      if (isLogged) {
        incrementQtyApi(productId);
      } else {
        dispatch(incrementqty({ id: productId, username }));
      }
    }
  }
  function decrement(e) {
    e.preventDefault();
    if (qty > 1) {
      setQtyState((prev) => prev - 1);
      if (isLogged) {
        decrementQtyApi(productId);
      } else {
        dispatch(decrementqty({ id: productId, username }));
      }
    }
  }
  function Cartdelete(e) {
    e.preventDefault();
    if (isLogged) {
      deleteItemApi(productId);
    } else {
      dispatch(deleteitem({ id: productId, username }));
    }
  }

  return isLoading ? null : (
    <div className="w-full  py-5 px-3 flex flex-col gap-4 md:flex-col lg:flex-row lg:justify-between rounded-lg shadow-xl bg-gray-50 ">
      <Link to={`/product/${productId}`}>
        <div className="flex gap-2">
          <img
            src={
              product?.ImageURL?.includes("http")
                ? product?.ImageURL
                : BACKEND_URL + product?.ImageURL
            }
            className="min-w-20 min-h-20 max-20 max-h-20 rounded-lg shadow-lg lg:max-w-28 lg:max-h-28 lg:min-w-28 lg:min-h-28"
          />
          <div className=" flex flex-col flex-wrap justify-around  ">
            <h2 className="text-lg lg:text-xl leading-5 font-semibold sm:tracking-wider lg:tracking-widest pl-2 md:min-w-80">
              {product?.ProductTitle}
            </h2>
            <span className="text-xl pl-2 font-extrabold tracking-widest text-gray-900">
              ₹{price}
            </span>
          </div>
        </div>
      </Link>
      <div className="p-2 flex lg:flex-col justify-between lg:items-end flex-row-reverse items-center">
        <button onClick={Cartdelete}>
          <DeleteIcon />
        </button>
        <div className="flex rounded outline outline-1 outline-slate-200">
          <button
            className=" bg-slate-200 w-7 h-7 rounded-l"
            onClick={decrement}
          >
            -
          </button>
          <span className="w-7 text-center text-lg font-semibold">
            {qtyState}
          </span>
          <button
            className="bg-slate-200 w-7 h-7 rounded-r"
            onClick={increment}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
