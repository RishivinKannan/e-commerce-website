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
      <div className="p-2 pt-28 bg-gray-100 min-h-screen">
        <span className="pl-8 text-3xl font-extrabold tracking-wider leading-9 [text-shadow:1px_1px_3px_var(--tw-shadow-color)] shadow-gray-600">
          Cart
        </span>
        <div className="p-4 grid grid-cols-3 gap-y-10 md:grid-cols-5">
          <div className="col-span-3 flex flex-col gap-4 items-center p-4">
            {cartList.length == 0 ? (
              <div className="w-full h-full flex justify-center items-center text-2xl font-bold tracking-wider text-zinc-600">
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
          <div className="py-3 flex justify-center col-span-3 md:col-span-2 ">
            <OrderSummary />
          </div>
        </div>
      </div>
    </>
  );
}
