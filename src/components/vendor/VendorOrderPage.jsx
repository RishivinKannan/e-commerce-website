import { Disclosure, Transition } from "@headlessui/react";
import { useGetVendorOrdersQuery } from "../../Redux/api/vendorOrderApi";
import OrderItem from "./OrderItem";
import { DownChevIcon } from "../../utils/Icons";

const VendorOrderPage = () => {
  const { data, isLoading } = useGetVendorOrdersQuery();
  if (isLoading) {
    return <></>;
  }
  return (
    <div className="w-full space-y-6 p-4 ">
      <span className="text-xl md:text-2xl font-bold leading-9 shadow-gray-600">
        Orders
      </span>
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={`${
                open ? "" : "border-b-2"
              } w-full py-4 border-gray-200/50`}
            >
              <span className="text-lg font-semibold flex items-center gap-2 ">
                <span className={`${!open ? "" : "rotate-180 transform"}`}>
                  <DownChevIcon />
                </span>
                Yet to Dispatch
              </span>
            </Disclosure.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform -translate-y-6 opacity-0"
              enterTo="transform translate-y-0 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform translate-y-0 opacity-100"
              leaveTo="transform -translate-y-6 opacity-0"
            >
              <Disclosure.Panel className="lg:pl-8 w-full">
                {data?.orders?.length == 0 ? (
                  <div className="py-8 flex justify-center items-center text-xl font-semibold">
                   Currently you have no orders
                  </div>
                ) : (
                  <div className="grid xl:grid-cols-2 gap-x-4 gap-y-3">
                    {data?.orders?.map((order) => (
                      <OrderItem key={order?.id} {...order} />
                    ))}
                  </div>
                )}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
      <Disclosure >
        {({ open }) => (
          <>
            <Disclosure.Button
              className={`${
                open ? "" : "border-b-2"
              } w-full py-4 border-gray-200/50`}
            >
              <span className="text-lg font-semibold flex items-center gap-2 ">
                <span className={`${!open ? "" : "rotate-180 transform"}`}>
                  <DownChevIcon />
                </span>
                Dispatched
              </span>
            </Disclosure.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform -translate-y-6 opacity-0"
              enterTo="transform translate-y-0 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform translate-y-0 opacity-100"
              leaveTo="transform -translate-y-6 opacity-0"
            >
              <Disclosure.Panel className="lg:pl-8 w-full">
                {data?.dispatched?.length == 0 ? (
                  <div className="py-8 flex justify-center items-center text-xl font-semibold">
                    No order item
                  </div>
                ) : (
                  <div className="grid xl:grid-cols-2 gap-x-4 gap-y-3">
                    {data?.dispatched?.map((order) => (
                      <OrderItem key={order?.id} {...order} />
                    ))}
                  </div>
                )}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
};
export default VendorOrderPage;
