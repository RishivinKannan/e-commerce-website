/* eslint-disable react/prop-types */
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Link } from "react-router-dom";
import { HeartIcon } from "../utils/Icons";
import { useEffect, useState, useContext } from "react";
import { UserDetailsContext } from "../App";
export default function ProductCard({
  id,
  imageUrl,
  title,
  rating = 3,
  mrp = "300",
  price = "200",
  showFav = false,
  ...otherProps
}) {
  const [isFav, setIsFav] = useState(false);
  const [favList, setFavList] = useState([]);
  const { username } = useContext(UserDetailsContext);

  useEffect(() => {
    const local = localStorage.getItem(`${username}-Favlist`)
      ? JSON.parse(localStorage.getItem(`${username}-Favlist`))
      : [];
    setFavList(local);
  }, [username]);

  useEffect(() => {
    const t = favList.find((fav) => fav == id) == id;
    setIsFav(t);
  }, [favList, id]);

  function handleClick() {

    if (isFav) {
      const list = JSON.parse(localStorage.getItem(`${username}-Favlist`));
      const removed = list.splice(list.indexOf(id), 1);
      console.log(removed);
      localStorage.setItem(`${username}-Favlist`, JSON.stringify(list));
      setIsFav(false);
    } else {
      const favAdder = localStorage.getItem(`${username}-Favlist`)
        ? JSON.parse(localStorage.getItem(`${username}-Favlist`)).concat(id)
        : [id];
      localStorage.setItem(`${username}-Favlist`, JSON.stringify(favAdder));
      setIsFav(true);
    }
  }

  return (
    <div>
      <Link to={`/product/${id}`}>
        <div
          {...otherProps}
          className="  py-4 px-5 flex flex-col gap-6 max-w-64 min-h-80 rounded-lg space-y-6 group"
        >
          <div className='relative z-0 w-44 h-44'>
            <img
              src={imageUrl}
              className="w-44 h-44 rounded-lg shadow-xl transition-all group-hover:scale-105 group-hover:shadow-2xl"
            />
            {showFav ? (
              <div
                className=" absolute top-2 right-2 hidden group-hover:inline-block"
                onClick={(e) => {
                  e.preventDefault()
                  handleClick()}}
              >
                <HeartIcon isFill={isFav} className="w-5 h-5" />
              </div>
            ) : (
              " "
            )}
          </div>

          <div className="space-y-2">
            <h2 className=" leading-6 font-bold tracking-widest pl-1 text-wrap ">
              {title}
            </h2>
            <Rating value={rating} readOnly className="max-w-28 z-0" />
            <span className="text-lg pl-1 font-bold tracking-wider">
              ₹{price}
            </span>
            <span className="text-lg pl-1 font-bold tracking-wider ml-2 line-through text-gray-500">
              ₹{mrp}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
