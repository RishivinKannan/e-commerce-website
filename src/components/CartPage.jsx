import CartProduct from "./CartProduct";
import OrderSummary from './OrderSummary';

export default function CartPage() {
  return (
    <div className="p-2 pt-28 bg-gray-100 min-h-screen">
      <span className="pl-8 text-3xl font-extrabold tracking-wider leading-9 [text-shadow:1px_1px_3px_var(--tw-shadow-color)] shadow-gray-600">
        Cart
      </span>
      <div className="p-4 grid grid-cols-3 md:grid-cols-5">
        <div className="col-span-3 flex flex-col gap-4 items-center p-4">
          <CartProduct />
          <CartProduct />
        </div>
        <div className="py-8 flex justify-center col-span-3 md:col-span-2 ">
          <OrderSummary/>
        </div>
      </div>
    </div>
  );
}
