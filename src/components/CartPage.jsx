import { useEffect} from "react";
import CartProduct from "./CartProduct";
import OrderSummary from "./OrderSummary";
import { useDispatch, useSelector } from "react-redux";
import { getcart } from "../Redux/services/cartSlice";

export default function CartPage() {
  const { username } = useSelector((state) => state.user);
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getcart({ username }));
  }, [username,dispatch]);
  return (
    <>
      <div className="min-h-screen p-2 bg-gray-100 pt-28">
        <span className="pl-8 text-3xl font-extrabold tracking-wider leading-9 [text-shadow:1px_1px_3px_var(--tw-shadow-color)] shadow-gray-600">
          Cart
        </span>
        <div className="grid grid-cols-3 p-4 gap-y-10 md:grid-cols-5">
          <div className="flex flex-col items-center col-span-3 gap-4 p-4">
            {cartList.length == 0 ? (
              <div className="flex items-center justify-center w-full h-full text-2xl font-bold tracking-wider text-zinc-600">
                No Cart Items
              </div>
            ) : (
              cartList.map((item) => (
                <CartProduct
                  key={item?.id}
                  {...item}
                />
              ))
            )}
          </div>
          <div className="flex justify-center col-span-3 py-3 md:col-span-2 ">
            <OrderSummary />
          </div>
        </div>
      </div>
    </>
  );
}
