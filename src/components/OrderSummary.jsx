import { useDispatch, useSelector } from "react-redux";
import { CouponIcon, LongRightArrowIcon } from "../utils/Icons";
import { addDiscount, setTotal } from "../Redux/services/cartSlice";
import { useEffect, useState } from "react";
import {
  useApplyCouponMutation,
  useGetCouponQuery,
  useGetOrderSummaryQuery,
} from "../Redux/api/cartApi";
import CouponList from "./CouponList";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function OrderSummary({ iscart = false }) {
  const [code, setCode] = useState("");
  const [subT, setSubT] = useState(0);
  const [focus, setFocus] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subTotal, discount, discountCode } = useSelector(
    (state) => state.cart
  );
  const { isLogged } = useSelector((state) => state.user);
  const { data } = useGetOrderSummaryQuery();
  const [applycoupon, { data: couponData, isSuccess, isError, error }] =
    useApplyCouponMutation();
  const { data: couponList, isSuccess: listSuccess } = useGetCouponQuery();

  const total = subT + 60 - discount;
  useEffect(() => {
    if (isLogged) {
      setSubT(data?.subTotal);
    } else {
      setSubT(subTotal);
    }
  }, [isLogged, data, subTotal]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        addDiscount({ discount: couponData.discount, code: couponData.code })
      );
    } else if (isError) {
      alert(error.data.message);
    }
  }, [isSuccess, isError, dispatch, error, couponData]);

  const couponHandler = (coupon) => {
    if (!isLogged) {
      alert("Please Login First");
    } else if (/\s/.test(code)) {
      alert("Invalid Coupon");
    } else {
      applycoupon(coupon);
    }
  };

  const checkoutHandler = () => {
    if (total > 0 && isLogged) {
      dispatch(setTotal({ total }));
      navigate("/checkout");
    } else if (!isLogged) {
      alert("Please Login First");
    }
  };
  return (
    <div className=" relative shadow-lg w-full bg-gray-50  p-4 rounded-xl h-min space-y-4">
      <h2 className="text-2xl font-bold tracking-wide pb-2">Order Summary</h2>
      <div>
        <span className="text-gray-600 text-lg font-semibold tracking-wide">
          Subtotal
        </span>
        <span className="text-gray-800 text-xl font-bold tracking-wide float-right">
          ₹{subT}
        </span>
      </div>
      <div>
        <span className="text-gray-600 text-lg font-semibold tracking-wide">
          Discount
        </span>
        <span className=" text-xl font-bold tracking-wide float-right text-red-500">
          - ₹{discount}
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
      {iscart ? (
        <>
          <div className="flex w-full justify-between pb-4">
            <div className="flex gap-3 items-center rounded-3xl w-8/12 md:w-9/12 py-3 px-4 bg-lightest">
              <CouponIcon />
              <input
                type="text"
                placeholder="Add Promo Code"
                className="w-full bg-lightest font-semibold tracking-wider placeholder:text-gray-500  focus:outline-none"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onFocus={() => setFocus(true)}
                onBlur={(e) => {
                  e.relatedTarget === null
                    ? setFocus(false)
                    : e.relatedTarget.name === "coupon"
                    ? null
                    : setFocus(false);
                }}
              />
            </div>

            <button
              className="rounded-3xl py-3 px-7 md:py-2 lg:py-3 md:px-4 lg:px-7 text-white bg-darker text-lg font-bold tracking-wider hover:outline outline-gray-500"
              onClick={() => couponHandler(code)}
            >
              Apply
            </button>
          </div>
          {listSuccess && focus ? (
            <CouponList
              list={couponList}
              onSelect={(code) => {
                setCode(code);
                setFocus(false);
              }}
            />
          ) : (
            ""
          )}
          {discountCode == "" ? null : (
            <div className="p-4 pt-0 text-gray-600 text-lg font-semibold">
              Applied Coupon :
              <span className="text-red-400"> {discountCode} </span>
            </div>
          )}
          <button
            onClick={() => checkoutHandler()}
            className="w-full flex justify-center items-center gap-2 rounded-3xl py-3 px-6 text-white bg-darker text-lg font-bold tracking-wider hover:outline outline-gray-500"
          >
            Go to Checkout
            <LongRightArrowIcon />
          </button>
        </>
      ) : null}
    </div>
  );
}

export default OrderSummary;
