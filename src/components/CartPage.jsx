import { useEffect, useState } from "react";
import CartProduct from "./CartProduct";
import OrderSummary from "./OrderSummary";
import { useDispatch, useSelector } from "react-redux";
import { getcart } from "../Redux/services/cartSlice";
import { useGetCartQuery } from "../Redux/api/cartApi";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const { username, isLogged } = useSelector((state) => state.user);
  const { cartList } = useSelector((state) => state.cart);
  const { data } = useGetCartQuery();
  useEffect(() => {
    if (isLogged) {
      setCart(data);
    } else {
      setCart(cartList);
    }
  }, [cartList, data, isLogged]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getcart({ username }));
  }, [username, dispatch]);
  return (
    <>
      <div className="min-h-screen p-2 bg-gray-100 pt-28">
        <span className="pl-8 text-3xl font-extrabold tracking-wider leading-9 [text-shadow:1px_1px_3px_var(--tw-shadow-color)] shadow-gray-600">
          Cart
        </span>
        <div className=" grid grid-cols-3 p-4 gap-y-10 md:grid-cols-5">
          {cart?.length == 0 || cart == undefined ? (
            <div className="pt-28 col-span-3 md:col-span-5 flex items-center justify-center w-full text-2xl font-bold tracking-wider text-zinc-600">
              No Cart Items
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center col-span-3 gap-4 p-4">
                {cart.map((item) => (
                  <CartProduct key={item?.productId} {...item} />
                ))}
              </div>
              <div className="flex justify-center col-span-3 py-3 md:col-span-2 ">
                <OrderSummary iscart />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
