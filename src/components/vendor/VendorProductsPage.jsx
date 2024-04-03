import { Link } from "react-router-dom";
import { useGetVendorProductsQuery } from "../../Redux/api/vendorApi";
import { BACKEND_URL } from "../../utils/constants";
const VendorProductsPage = () => {
  const { data: products, isLoading } = useGetVendorProductsQuery();
  console.log(products);
  // const products = [
  //   {
  //     ProductId: 33304,
  //     Gender: "Boys",
  //     Category: "Apparel",
  //     SubCategory: "Topwear",
  //     ProductType: "Tshirts",
  //     Colour: "Yellow",
  //     Usage: "Casual",
  //     ProductTitle: "Gini and Jony Boys Pack of 2 T-shirts",
  //     Image: "33304.jpg",
  //     ImageURL:
  //       "http://assets.myntassets.com/v1/images/style/properties/8f70720a7471ab797d7e0be3fca31bb8_images.jpg",
  //   },
  //   {
  //     ProductId: 37596,
  //     Gender: "Boys",
  //     Category: "Apparel",
  //     SubCategory: "Topwear",
  //     ProductType: "Tshirts",
  //     Colour: "Navy Blue",
  //     Usage: "Casual",
  //     ProductTitle: "Madagascar3 Boys Navy Blue Printed T-Shirt",
  //     Image: "37596.jpg",
  //     ImageURL:
  //       "http://assets.myntassets.com/v1/images/style/properties/d8ea01af4102cefd98d5a06874f471ab_images.jpg",
  //   },
  //   {
  //     ProductId: 38986,
  //     Gender: "Boys",
  //     Category: "Apparel",
  //     SubCategory: "Topwear",
  //     ProductType: "Tshirts",
  //     Colour: "Blue",
  //     Usage: "Casual",
  //     ProductTitle: "Gini and Jony Boys Comics Blue T-shirt",
  //     Image: "38986.jpg",
  //     ImageURL:
  //       "http://assets.myntassets.com/v1/images/style/properties/4edd53d62c2633204d1b673c129309a4_images.jpg",
  //   },
  //   {
  //     ProductId: 39854,
  //     Gender: "Boys",
  //     Category: "Apparel",
  //     SubCategory: "Topwear",
  //     ProductType: "Tshirts",
  //     Colour: "White",
  //     Usage: "Casual",
  //     ProductTitle: "Gini and Jony Boys Printed White T-Shirt",
  //     Image: "39854.jpg",
  //     ImageURL:
  //       "http://assets.myntassets.com/v1/images/style/properties/166adc34a17751d729ef1c95abfef054_images.jpg",
  //   },
  // ];
  // const isLoading = false;
  return (
    <div className="p-4 space-y-12">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold leading-9">
          All Products
        </h1>
        <Link
          to={"/vendor/products/new"}
          className="w-36 md:w-44 flex justify-center items-center gap-2 rounded py-2 px-2 md:px-6 text-white bg-darker text-sm md:text-lg font-bold tracking-wider hover:outline outline-gray-500"
        >
          Add Product
        </Link>
      </div>

      <div className="">
        {products?.length == 0 || isLoading ? (
          <div className="h-96 w-full flex justify-center items-center">
            <span className="text-2xl font-bold tracking-wider text-zinc-600">
              No Products
            </span>
          </div>
        ) : (
          <ul className="space-y-4">
            <li className="grid grid-cols-12 pb-2 px-4">
              <span className="text-gray-600">S.No.</span>
              <span className=" text-gray-700 font-semibold ">Image</span>
              <span className=" text-gray-700 font-semibold">Id</span>
              <span className="col-span-7 text-gray-600 font-semibold text-balance ">
                Name
              </span>
              <span className="col-span-2 text-gray-700 font-semibold">
                Category
              </span>
            </li>
            {products.map(
              ({ ProductId, ProductTitle, SubCategory, ImageURL }, index) => (
                <Link to={`/vendor/products/${ProductId}`} key={ProductId}>
                  <li className="grid grid-cols-12 py-6 px-4 shadow rounded-lg items-center">
                    <span className="text-gray-600">{index + 1}</span>
                    <img src={BACKEND_URL + ImageURL} className=" w-12 " />
                    <span className=" text-gray-700 font-semibold trans">
                      {ProductId}
                    </span>
                    <span className="col-span-7 text-gray-600 font-semibold text-balance ">
                      {ProductTitle}
                    </span>
                    <span className="col-span-2 text-gray-700 font-semibold">
                      {SubCategory}
                    </span>
                  </li>
                </Link>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default VendorProductsPage;
