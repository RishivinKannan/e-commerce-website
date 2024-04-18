/* eslint-disable react/prop-types */
import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";
import { DeleteIcon, PriceTrackerIcon } from "../utils/Icons";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useGetProductQuery } from "../Redux/api/productsDjango";
import {
  useDeleteTrackerMutation,
  useGetPricesQuery,
} from "../Redux/api/trackerApi";
import { BACKEND_URL } from "../utils/constants";

const TrackerCard = ({ id, product }) => {
  const { data: productData, isLoading } = useGetProductQuery(product);
  const { data: prices } = useGetPricesQuery(product);
  const [deleteTracker] = useDeleteTrackerMutation();

  if (isLoading) {
    return <></>;
  }
  return (
    <Disclosure>
      <div className="w-full lg:w-10/12  py-5 px-3 rounded-lg shadow-xl bg-gray-50">
        <div className=" flex justify-between">
          <Link to={`/product/${product}`}>
            <div className="flex gap-2 md:gap-4">
              <img
                src={BACKEND_URL + productData.ImageURL}
                className="min-w-16 min-h-16 max-16 max-h-16 rounded-lg shadow-lg lg:max-w-28 lg:max-h-28 lg:min-w-28 lg:min-h-28"
              />
              <div className=" flex flex-col flex-wrap justify-around  ">
                <h2 className="text-lg lg:text-xl leading-5 font-semibold sm:tracking-wider lg:tracking-widest pl-2 md:min-w-80">
                  {productData.ProductTitle}
                </h2>
                <span className="text-xl pl-2 font-extrabold tracking-widest text-gray-900">
                  {productData.discounted_price}
                </span>
              </div>
            </div>
          </Link>
          <div className="flex flex-col justify-between items-end pr-4">
            <div className="cursor-pointer" onClick={() => deleteTracker(id)}>
              <DeleteIcon />
            </div>
            <Disclosure.Button>
              <PriceTrackerIcon />
            </Disclosure.Button>
          </div>
        </div>
        <Disclosure.Panel className={"px-1 py-4 w-full h-36 md:h-48"}>
          <ResponsiveContainer>
            <AreaChart
              data={prices}
              
              margin={{
                top: 10,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <XAxis dataKey="date" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="price"
                dot = {{ stroke:"#8884d8", strokeWidth: 2 }}
                stroke="#8884d8"
                fill="#c6e2ff"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Disclosure.Panel>
      </div>
    </Disclosure>
  );
};

export default TrackerCard;
