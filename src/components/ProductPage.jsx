import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
// import axios from "axios";
import { Rating } from "@smastrom/react-rating";
import { HeartIcon, LongRightArrowIcon } from "../utils/Icons";
import ProductImage from "./ProductImage";
import { useDispatch, useSelector } from "react-redux";
import { addtocart, getcart } from "../Redux/services/cartSlice";
import ProductTabs from "./ProductTabs";
import Section from "./Section";
import { useGetTopPicksQuery } from "../Redux/api/products";
import { useGetProductQuery } from "../Redux/api/productsDjango";
import { addtofav, getFavList, removefav } from "../Redux/services/FavSlice";
import { addtohistory } from "../Redux/services/historySlice";
import { BACKEND_URL } from "../utils/constants";

const ProductPage = () => {
  const { id } = useParams();
  const topPicks = useGetTopPicksQuery();
  const { data: product, isLoading } = useGetProductQuery(id);
  console.log(product);
  // const [product, setProduct] = useState([]);
  const [isCartItem, setIsCartItem] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [qty, setQty] = useState(1);
  const { username } = useSelector((state) => state.user);
  const { cartList } = useSelector((state) => state.cart);
  const { favList } = useSelector((state) => state.fav);
  const dispatch = useDispatch();
  useEffect(() => {
    // axios.get("../fashionProducts.json").then((res) => {
    //   setProduct(res.data.filter((data) => data.ProductId.toString() == id));
    // });
    if (cartList.length != 0) {
      const t = cartList.find((item) => item.id == id)?.id == id;
      setIsCartItem(t);
    }
    const temp = favList.find((fav) => fav == id) == id;
    setIsFav(temp);
  }, [id, username, cartList, favList]);

  useEffect(() => {
    dispatch(getcart({ username }));
    dispatch(getFavList({ username }));
  }, [dispatch, username]);

  useEffect(() => {
    dispatch(addtohistory({ id, username }));
  }, [dispatch, id, username]);

  const addToCart = (price) => {
    dispatch(addtocart({ id, qty, username, price }));
    setIsCartItem(true);
  };
  function favClick(id) {
    if (isFav) {
      dispatch(removefav({ id, username }));
      setIsFav(false);
    } else {
      dispatch(addtofav({ id, username }));
      setIsFav(true);
    }
  }



  return isLoading ? (
    <div className="min-h-screen py-4 bg-gray-100 pt-28">Loading...</div>
  ) : (
    <div className="min-h-screen py-4 bg-gray-100 pt-28">
      <div className="grid grid-cols-5 p-6 rounded-lg md:max-lg:grid-cols-4">
        <div className="relative z-0 col-span-5 md:col-span-2 ">
          <ProductImage
            images={[
              product?.ImageURL?.includes("http")
                ? product?.ImageURL
                : BACKEND_URL + product?.ImageURL,
            ].concat(
              product?.images?.map((image) => BACKEND_URL + image.ImageURL)
            )}
          />
          <div
            className="absolute top-0 z-40 inline-block p-2 rounded-full right-6"
            onClick={(e) => {
              e.preventDefault();
              favClick(id);
            }}
          >
            <HeartIcon isFill={isFav} className="w-5 h-5" />
          </div>
        </div>
        <div className="col-span-5 p-2 space-y-2 md:col-span-2 lg:col-span-3">
          <h1 className="text-2xl font-extrabold tracking-wide">
            {product?.ProductTitle}
          </h1>
          <h1 className="text-lg font-semibold tracking-wide text-gray-600">
            {product?.SubCategory}
          </h1>
          <Rating
            value={product.rating ? product.rating : 4}
            readOnly
            className="z-0 pb-4 max-w-28"
          />
          <span className="inline-block pr-4 text-3xl font-extrabold tracking-wide">
            {product.discounted_price ? product.discounted_price : "₹ 200"}
          </span>
          <span className="inline-block text-3xl font-extrabold tracking-wide text-gray-600 line-through">
            {product.actual_price ? product.actual_price : "₹ 200"}
          </span>
          <p className="pt-2 text-sm font-semibold leading-6 tracking-wide text-justify text-gray-500 md:pr-6">
            {product?.about_product ? (
              product?.about_product
            ) : (
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui,
                impedit tempora nemo totam quia architecto nulla magnam, itaque
                sint possimus odit sequi rem, quidem deserunt laboriosam veniam
                corrupti eius sapiente! Veritatis consectetur neque architecto
                libero facere autem iure ratione consequuntur voluptate quis
                quam molestiae.
              </span>
            )}
          </p>
          {!isCartItem ? (
            <div className="flex gap-8 pt-10 ">
              <div className="flex rounded-3xl outline outline-1 outline-gray-300 ">
                <button
                  className="h-12 text-lg font-semibold bg-slate-300 w-14 rounded-l-3xl hover:text-xl"
                  onClick={() => (qty <= 1 ? null : setQty((prev) => prev - 1))}
                >
                  -
                </button>
                <span className="w-14 bg-slate-200/30 text-center leading-[3rem] text-lg font-semibold">
                  {qty}
                </span>
                <button
                  className="h-12 text-lg font-semibold bg-slate-300 w-14 rounded-r-3xl hover:text-xl"
                  onClick={() =>
                    qty >= 10 ? null : setQty((prev) => prev + 1)
                  }
                >
                  +
                </button>
              </div>
              <button
                className="flex items-center justify-center gap-2 px-6 py-2 text-lg font-bold tracking-wider text-white w-96 rounded-3xl bg-darker hover:outline outline-gray-500"
                onClick={() =>
                  addToCart(
                    product.discounted_price ? product.discounted_price : 200
                  )
                }
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
      <div className="px-4 lg:px-16">
        <ProductTabs />
      </div>
      <Section
        Heading={"Related Products"}
        products={topPicks?.data}
        loading={topPicks?.isLoading}
      />
    </div>
  );
};

export default ProductPage;
