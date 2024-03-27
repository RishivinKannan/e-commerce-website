import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";
import { PriceTrackerIcon } from "../utils/Icons";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const TrackerCard = () => {
  const product = {
    ProductId: 42419,
    Gender: "Girls",
    Category: "Apparel",
    SubCategory: "Topwear",
    ProductType: "Tops",
    Colour: "White",
    Usage: "Casual",
    ProductTitle: "Gini and Jony Girls Knit White Top",
    Image: "42419.jpg",
    ImageURL:
      "http://assets.myntassets.com/v1/images/style/properties/f3964f76c78edd85f4512d98b26d52e9_images.jpg",

    data: [
      {
        date: "start",
        price: 300,
      },
      {
        date: "17Jan2023",
        price: 200,
      },
    ],
  };
  return (
    <Disclosure>
      <div className="w-full lg:w-10/12  py-5 px-3 rounded-lg shadow-xl bg-gray-50">
        <div className=" flex justify-between">
          <Link to={`/`}>
            <div className="flex gap-2 md:gap-4">
              <img
                src={product.ImageURL}
                className="min-w-16 min-h-16 max-16 max-h-16 rounded-lg shadow-lg lg:max-w-28 lg:max-h-28 lg:min-w-28 lg:min-h-28"
              />
              <div className=" flex flex-col flex-wrap justify-around  ">
                <h2 className="text-lg lg:text-xl leading-5 font-semibold sm:tracking-wider lg:tracking-widest pl-2 md:min-w-80">
                  {product.ProductTitle}
                </h2>
                <span className="text-xl pl-2 font-extrabold tracking-widest text-gray-900">
                  ₹200
                </span>
              </div>
            </div>
          </Link>
          <div className="flex flex-col justify-end items-end pr-4">
            <Disclosure.Button>
              <PriceTrackerIcon />
            </Disclosure.Button>
          </div>
        </div>
        <Disclosure.Panel className={"px-1 py-4 w-full h-36 md:h-48"}>
          <ResponsiveContainer>
            <AreaChart
              data={product.data}
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
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Disclosure.Panel>
      </div>
    </Disclosure>
  );
};

export default TrackerCard;
