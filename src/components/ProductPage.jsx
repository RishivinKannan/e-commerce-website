import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Rating } from "@smastrom/react-rating";
import ProductImage from "./ProductImage";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios.get("../fashionProducts.json").then((res) => {
      setProduct(res.data.filter((data) => data.ProductId.toString() == id));
    });
  }, [id]);

  // useEffect(() => {
  //   console.log(products)
  // }, [products,id]);

  return product.length == 0 ? (
    "Loading"
  ) : (
    <div className="pt-28 py-4 bg-gray-100 min-h-screen">
      <div className="grid md:max-lg:grid-cols-4 grid-cols-5  p-6 rounded-lg">
        <div className="col-span-5 md:col-span-2 ">
          <ProductImage
            images={[
              product[0].ImageURL,
              "http://assets.myntassets.com/v1/images/style/properties/Lotto-Women-Black-Flip-Flops_957be72b36ce05aaf445772277fa1f0c_images.jpg",
            ]}
          />
        </div>
        <div className="col-span-5 md:col-span-2 lg:col-span-3 p-2 space-y-2">
          <h1 className="text-2xl font-extrabold tracking-wide">
            {product[0].ProductTitle}
          </h1>
          <h1 className="text-lg font-semibold tracking-wide text-gray-600">
            {product[0].SubCategory}
          </h1>
          <Rating value={4} readOnly className="max-w-28 pb-4 z-0" />
          <span className="text-3xl font-extrabold tracking-wide pr-4 inline-block">
            ₹ 200
          </span>
          <span className="text-3xl font-extrabold tracking-wide line-through text-gray-600 inline-block">
            ₹ 300
          </span>
          <p className="tracking-wide leading-6 text-justify pr-6 pt-2 font-semibold text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui,
            impedit tempora nemo totam quia architecto nulla magnam, itaque sint
            possimus odit sequi rem, quidem deserunt laboriosam veniam corrupti
            eius sapiente! Veritatis consectetur neque architecto libero facere
            autem iure ratione consequuntur voluptate quis quam molestiae.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
