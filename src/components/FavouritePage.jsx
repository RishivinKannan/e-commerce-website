import FavCard from "./FavCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAll, getFavList } from "../Redux/services/FavSlice";
// import axios from "axios";

const FavouritePage = () => {
  // const [products, setProducts] = useState([]);
  // const [favList, setFavList] = useState([]);
  const { username } = useSelector((state) => state.user);
  const { favList } = useSelector((state) => state.fav);
  const dispatch = useDispatch();

  useEffect(() => {
    // axios.get("./fashionProducts.json").then((res) => setProducts(res.data));
    // const local = localStorage.getItem(`${username}-Favlist`)
    //   ? JSON.parse(localStorage.getItem(`${username}-Favlist`))
    //   : [];
    // setFavList(local);
    dispatch(getFavList({ username }));
  }, [username, dispatch]);

  return (
    <>
      <div className="pt-28 px-6  bg-gray-100 space-y-10 min-h-screen">
        <div>
          <span className="text-2xl font-extrabold tracking-wider leading-9 [text-shadow:1px_1px_3px_var(--tw-shadow-color)] shadow-gray-600">
            WishList
          </span>
          <button
            className="p-2 text-lg bg-red-600 text-white rounded-md float-right"
            onClick={() => {
              dispatch(deleteAll({ username }));
            }}
          >
            Delete All
          </button>
        </div>
        {favList.length == 0 ? (
          <div className="flex justify-center items-center p-32">
            <h1 className="text-2xl font-bold tracking-wider text-zinc-600">
              No Favourite Items
            </h1>
          </div>
        ) : (
          <div className="grid gap-y-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
            {favList.map((id) => {
              return <FavCard key={id} id={id} />;
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default FavouritePage;
