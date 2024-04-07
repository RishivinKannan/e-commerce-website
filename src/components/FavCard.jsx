/* eslint-disable react/prop-types */
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Link } from "react-router-dom";
import { HeartIcon } from "../utils/Icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtofav, getFavList, removefav } from "../Redux/services/FavSlice";
import { BACKEND_URL } from "../utils/constants";
import { useGetProductQuery } from "../Redux/api/productsDjango";
export default function FavCard({ id, ...otherProps }) {
  const [isFav, setIsFav] = useState(false);
  const { username } = useSelector((state) => state.user);
  const { favList } = useSelector((state) => state.fav);
  const { data: product, isLoading } = useGetProductQuery(id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFavList({ username }));
  }, [username, dispatch]);

  useEffect(() => {
    const t = favList.find((fav) => fav == id) == id;
    setIsFav(t);
  }, [favList, id]);

  function handleClick() {
    if (isFav) {
      dispatch(removefav({ id, username }));
      setIsFav(false);
    } else {
      dispatch(addtofav({ id, username }));
      setIsFav(true);
    }
  }

  if (isLoading) {
    return <></>;
  }

  return (
    <div>
      <Link to={`/product/${id}`}>
        <div
          {...otherProps}
          className="  py-4 px-5 flex flex-col gap-6 max-w-64 min-h-80 rounded-lg space-y-6 group"
        >
          <div className="relative z-0 w-44 h-44">
            <img
              src={
                product?.Product?.ImageURL?.includes("http")
                  ? product?.ImageURL
                  : BACKEND_URL + product?.ImageURL
              }
              className="w-44 h-44 rounded-lg shadow-xl transition-all group-hover:scale-105 group-hover:shadow-2xl"
            />
            <div
              className=" absolute top-2 right-2 hidden group-hover:inline-block"
              onClick={(e) => {
                e.preventDefault();
                handleClick();
              }}
            >
              <HeartIcon isFill={isFav} className="w-5 h-5" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="max-h-24 leading-6 font-bold tracking-widest pl-1 text-wrap truncate">
              {product?.ProductTitle}
            </h2>
            <Rating value={product?.rating} readOnly className="max-w-28 z-0" />
            <span className="text-lg pl-1 font-bold tracking-wider">
              ₹{product?.discounted_price ? product.discounted_price : 200}
            </span>
            <span className="text-lg pl-1 font-bold tracking-wider ml-2 line-through text-gray-500">
              ₹{product?.actual_price ? product.actual_price : 200}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
