import { useDispatch } from "react-redux";
import { CouponIcon, LongRightArrowIcon } from "../utils/Icons";
import { discount } from "../Redux/services/cartSlice";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
function OrderSummary({ subTotal = 0, discountValue = 0 }) {
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const total = subTotal + 60 - discountValue;
  const coupon = () => {
    if (code == "ABCD") {
      dispatch(discount());
    } else {
      alert("Invaild Coupon code");
    }
  };
  return (
    <div className=" bg-gray-50 w-[30rem] xl:w-[32rem] p-4 rounded-xl h-min space-y-4">
      <h2 className="text-2xl font-bold tracking-wide pb-2">Order Summary</h2>
      <div>
        <span className="text-gray-600 text-lg font-semibold tracking-wide">
          Subtotal
        </span>
        <span className="text-gray-800 text-xl font-bold tracking-wide float-right">
          ₹{subTotal}
        </span>
      </div>
      <div>
        <span className="text-gray-600 text-lg font-semibold tracking-wide">
          Discount
        </span>
        <span className=" text-xl font-bold tracking-wide float-right text-red-500">
          - ₹{discountValue}
        </span>
      </div>
      <div>
        <span className="text-gray-600 text-lg font-semibold tracking-wide">
          Delivery Charges
        </span>
        <span className="text-gray-800 text-xl font-bold tracking-wide float-right">
          ₹{60}
        </span>
      </div>
      <hr className="bg-gray-300 h-[2px] w-full" />
      <div className="py-2">
        <span className="text-gray-800 text-xl font-bold tracking-wider">
          Total
        </span>
        <span className=" text-2xl font-bold tracking-wide float-right">
          ₹{total}
        </span>
      </div>
      <div className="flex w-full justify-between pb-4">
        <div className="flex gap-3 items-center rounded-3xl w-8/12 md:w-9/12 py-3 px-4 bg-lightest">
          <CouponIcon />
          <input
            type="text"
            placeholder="Add Promo Code"
            className="w-full bg-lightest font-semibold tracking-wider placeholder:text-gray-500  focus:outline-none"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <button
          className="rounded-3xl py-3 px-7 md:py-2 lg:py-3 md:px-4 lg:px-7 text-white bg-darker text-lg font-bold tracking-wider hover:outline outline-gray-500"
          onClick={() => coupon()}
        >
          Apply
        </button>
      </div>
      <button className="w-full flex justify-center items-center gap-2 rounded-3xl py-3 px-6 text-white bg-darker text-lg font-bold tracking-wider hover:outline outline-gray-500">
        Go to Checkout
        <LongRightArrowIcon />
      </button>
    </div>
  );
}

export default OrderSummary;
