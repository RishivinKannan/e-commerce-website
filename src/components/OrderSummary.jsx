import { CouponIcon,LongRightArrowIcon } from "../utils/Icons"

function OrderSummary() {
  return (
    <div className=" bg-gray-50 w-[30rem] xl:w-[32rem] p-4 rounded-xl h-min space-y-4">
        <h2 className='text-2xl font-bold tracking-wide pb-2'>Order Summary</h2>
        <div>
            <span className="text-gray-600 text-lg font-semibold tracking-wide">Subtotal</span>
            <span className="text-gray-800 text-xl font-bold tracking-wide float-right">₹400</span>
        </div>
        <div>
            <span className="text-gray-600 text-lg font-semibold tracking-wide">Discount</span>
            <span className=" text-xl font-bold tracking-wide float-right text-red-500">- ₹200</span>
        </div>
        <div>
            <span className="text-gray-600 text-lg font-semibold tracking-wide">Delivery Charges</span>
            <span className="text-gray-800 text-xl font-bold tracking-wide float-right">₹60</span>
        </div>
        <hr className="bg-gray-300 h-[2px] w-full" />
        <div className="py-2">
            <span className="text-gray-800 text-xl font-bold tracking-wider">Total</span>
            <span className=" text-2xl font-bold tracking-wide float-right">₹460</span>
        </div>
        <div className="flex w-full justify-between pb-4">
            <div className='flex gap-3 items-center rounded-3xl w-8/12 md:w-9/12 py-3 px-4 bg-lightest'>
                <CouponIcon/>
                <input type="text" placeholder="Add Promo Code" className='w-full bg-lightest font-semibold tracking-wider placeholder:text-gray-500  focus:outline-none' />
            </div>
            <button className="rounded-3xl py-3 px-7 md:py-2 lg:py-3 md:px-4 lg:px-7 text-white bg-darker text-lg font-bold tracking-wider">
                Apply
            </button>
        </div>
        <button className="w-full flex justify-center items-center gap-2 rounded-3xl py-3 px-6 text-white bg-darker text-lg font-bold tracking-wider">
                Go to Checkout
                <LongRightArrowIcon/>
        </button>
    </div>
  )
}

export default OrderSummary