import { Link } from "react-router-dom";
const VendorOrderPage = () => {
  const orders = [
    {
      ProductId: 42419,
      ProductTitle: "Gini and Jony Girls Knit White Top",
      ImageURL:
        "http://assets.myntassets.com/v1/images/style/properties/f3964f76c78edd85f4512d98b26d52e9_images.jpg",
    },
    {
      ProductId: 34009,
      ProductTitle: "Gini and Jony Girls Black Top",
      ImageURL:
        "http://assets.myntassets.com/v1/images/style/properties/dce310e4c15223a6c964631190263284_images.jpg",
    },
    {
      ProductId: 40143,
      ProductTitle: "Gini and Jony Girls Pretty Blossom Blue Top",
      ImageURL:
        "http://assets.myntassets.com/v1/images/style/properties/fc3c1b46906d5c148c45f532d0b3ffb5_images.jpg",
    },
  ];

  return (
    <div className="w-full space-y-6 p-4 bg-gray-100">
      <span className="text-xl md:text-2xl font-bold leading-9 shadow-gray-600">
        Orders
      </span>
      <div className="grid xl:grid-cols-2 gap-x-4 gap-y-3">
        {orders.map(({ ProductId, ProductTitle, ImageURL }) => (
          <div
            key={ProductId}
            className="w-full grid grid-cols-2 shadow-xl p-4 rounded"
          >
            <Link to={`/product/${ProductId}`}>
              <div className="flex gap-2">
                <img
                  src={ImageURL}
                  className="min-w-16 min-h-16 max-16 max-h-16 lg:min-w-20 lg:min-h-20  lg:max-20 lg:max-h-20 rounded-lg shadow-lg "
                />
                <div className=" flex flex-col flex-wrap justify-around  ">
                  <h2 className="text-base md:text-lg leading-5 font-semibold pl-2 min-w-56 md:min-w-80">
                    {ProductTitle}
                  </h2>
                  <span className="text-base md:text-lg pl-2 font-extrabold tracking-widest text-gray-900">
                    ₹200
                  </span>
                </div>
              </div>
            </Link>
            <div className="flex flex-col items-end justify-center">
              <button className="w-28 flex justify-center items-center gap-2 rounded py-2 px-2 md:px-6 text-white bg-darker text-sm font-bold tracking-wider hover:outline outline-gray-500">
                Dispatched
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default VendorOrderPage;
