/* eslint-disable react/prop-types */

import { CouponIcon } from "../utils/Icons";

export default function CouponList({ list, onSelect }) {

  return (
    <div className="relative z-5 -top-6 md:-top-12  bg-white text-black  rounded-xl shadow-2xl lg:translate-y-7 lg:left-0 lg:w-96">
      <div className="text-sm font-semibold  tracking-wide flex flex-col">
        <div className="px-3 pt-2">
          <span className="inline tracking-wider text-black float-left">
            Available Coupons
          </span>
        </div>
        {list.toReversed().map((item, index, arr) => {
          return (
            <div
              key={index + item.code}
              className="text-xs font-semibold  tracking-wide hover:bg-gray-300 "
              onClick={() => {
                onSelect(item.code);
              }}
            >
              <button className="flex items-center justify-start space-x-2 py-3 px-5"
               name='coupon'
              >
                <CouponIcon className={"w-4 h-3 text-black"} />
                <span className="text-blue-500 tracking-wide">{item.code}</span>
              </button>
              {arr.length - 1 === index ? (
                ""
              ) : (
                <hr className="bg-gray-200 h-[2px] w-full" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
