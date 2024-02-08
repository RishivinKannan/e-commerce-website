/* eslint-disable react/prop-types */
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { HeartIcon } from "../utils/Icons";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const local = localStorage.getItem("FavList")
      ? JSON.parse(localStorage.getItem("FavList"))
      : [];
    setFavList(local);
    
  }, [] );
  useEffect(
    ()=>{
        const t = favList.find((fav)=>fav==id)== id ;
        setIsFav(t);
    },[favList,id]
  )

  function handleClick() {

    if (isFav){
        const list = JSON.parse(localStorage.getItem("FavList"));
        const removed = list.splice(list.indexOf(id),1) ;
        console.log(removed);
        localStorage.setItem("FavList", JSON.stringify(list));
        setIsFav(false);
    }
    else{
        const favAdder = localStorage.getItem("FavList") ? JSON.parse(localStorage.getItem("FavList")).concat(id): [id] ;
        localStorage.setItem("FavList", JSON.stringify(favAdder));
        setIsFav(true);
    }
    
  }

  return (
    <div>
      <div
        {...otherProps}
        className=" relative py-4 px-5 flex flex-col gap-6 max-w-64 min-h-80 rounded-lg space-y-6 group"
      >
        <img
          src={imageUrl}
          className="w-44 h-44 rounded-lg shadow-xl transition-all group-hover:scale-105 group-hover:shadow-2xl"
        />
        {showFav ? (
          <div
            className=" absolute -top-4 py-4 px-8 right-0 hidden group-hover:inline-block"
            onClick={() => handleClick()}
          >
            <HeartIcon
              isFill={isFav}
              className="w-5 h-5"
            />
          </div>
        ) : (
          " "
        )}

        <div className="space-y-2">
          <h2 className=" leading-6 font-bold tracking-widest pl-1 text-wrap ">
            {title}
          </h2>
          <Rating value={rating} readOnly className="w-28 py-1 z-0" />
          <span className="text-lg pl-1 font-bold tracking-wider">
            ₹{price}
          </span>
          <span className="text-lg pl-1 font-bold tracking-wider ml-2 line-through text-gray-500">
            ₹{mrp}
          </span>
        </div>
      </div>
    </div>
  );
}
