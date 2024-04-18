import { useGetOrdersQuery } from "../Redux/api/orderApi";
import OrderItemCard from "./OrderItemCard";

const OrdersPage = () => {
  const { data } = useGetOrdersQuery();

  return (
    <div className="w-full pt-24 space-y-6 px-3 md:px-10 pb-12 bg-gray-100 min-h-screen">
      <span className="text-xl md:text-3xl font-bold leading-9 shadow-gray-600">
        Orders
      </span>
      {data?.toReversed()?.map(({ id, orderItems, is_paid, is_failed, paymentId }) => (
        <div
          key={id}
          className="w-full pt-6 p-8 bg-slate-200/70 rounded-lg space-y-4"
        >
          <div className="flex justify-between">
            <span className="text-slate-700 text-xl font-bold leading-9">
              #OrderID: <span className="text-black">{id}</span>
            </span>
            {is_paid && (
              <div className="flex items-center gap-8 md:gap-16 ">
                <div className=" text-xs lg:text-lg font-semibold text-slate-700 bg-white px-3 lg:px-8 py-1 rounded-3xl ">
                  Payment ID:{" "}
                  <span className="text-slate-900">{paymentId}</span>
                </div>
                <div className="bg-green-500/60 px-8 py-1 rounded-3xl text-white">
                  Paid
                </div>
              </div>
            )}
            {is_failed && (
              <div className="bg-red-500/60 px-8 py-1 rounded-3xl text-white">
                Failed
              </div>
            )}
            {!is_failed && !is_paid && (
              <div className="bg-slate-500/60 px-8 py-1 rounded-3xl text-white">
                Not paid
              </div>
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-x-4 gap-y-3">
            {orderItems.map((item) => (
              <OrderItemCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
