import { useState, useEffect, useContext } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";
import { Rating } from "@smastrom/react-rating";
import { LongRightArrowIcon } from "../utils/Icons";
import ProductImage from "./ProductImage";
import { UserDetailsContext } from "../App";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [isCartItem, setIsCartItem] = useState(false);
  const [qty, setQty] = useState(1);
  const { username } = useContext(UserDetailsContext);

  useEffect(() => {
    axios.get("../fashionProducts.json").then((res) => {
      setProduct(res.data.filter((data) => data.ProductId.toString() == id));
    });
    const cartList = localStorage.getItem(`${username}-Cart`)
      ? JSON.parse(localStorage.getItem(`${username}-Cart`))
      : [];
    if (cartList.length != 0) {
      const t = cartList.find((item) => item.id == id)?.id == id;
      console.log(t)
      setIsCartItem(t);
    }
  }, [id, username]);

  const addToCart = () => {
    const cartList = localStorage.getItem(`${username}-Cart`)
      ? JSON.parse(localStorage.getItem(`${username}-Cart`)).concat({
          id: id,
          qty: qty,
        })
      : [{
        id: id,
        qty: qty,
      }];

    localStorage.setItem(`${username}-Cart`, JSON.stringify(cartList));
    setIsCartItem(true);
  };

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
          <p className="tracking-wide leading-6 text-justify md:pr-6 pt-2 font-semibold text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui,
            impedit tempora nemo totam quia architecto nulla magnam, itaque sint
            possimus odit sequi rem, quidem deserunt laboriosam veniam corrupti
            eius sapiente! Veritatis consectetur neque architecto libero facere
            autem iure ratione consequuntur voluptate quis quam molestiae.
          </p>
          {!isCartItem ? (
            <div className="flex gap-8 pt-10 ">
              <div className="flex rounded-3xl outline outline-1 outline-gray-300 ">
                <button
                  className=" bg-slate-300 w-14 h-12 rounded-l-3xl text-lg font-semibold hover:text-xl"
                  onClick={() => (qty <= 1 ? null : setQty((prev) => prev - 1))}
                >
                  -
                </button>
                <span className="w-14 bg-slate-200/30 text-center leading-[3rem] text-lg font-semibold">
                  {qty}
                </span>
                <button
                  className="bg-slate-300 w-14 h-12 rounded-r-3xl text-lg font-semibold hover:text-xl"
                  onClick={() => setQty((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
              <button
                className="w-96 flex justify-center items-center gap-2 rounded-3xl py-2 px-6 text-white bg-darker text-lg font-bold tracking-wider hover:outline outline-gray-500"
                onClick={() => addToCart()}
              >
                Add To Cart
              </button>
            </div>
          ) : (
            <div className="pt-10">
              <NavLink
                to={"/cart"}
                className="w-full lg:w-[36rem] flex justify-center items-center gap-2 rounded-3xl py-3 px-6 text-white bg-darker text-lg font-bold tracking-wider hover:outline  outline-gray-500 "
              >
                Go To Cart
                <LongRightArrowIcon />
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
