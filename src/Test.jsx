import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFavList, removefav, addtofav } from "./Redux/services/FavSlice";
export default function Test() {
  const { username } = useSelector((state) => state.user);
  const { favList } = useSelector((state) => state.fav);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavList({ username }));
  }, [dispatch, username]);
  return (
    <>
      <div className="h-screen flex justify-center items-center gap-8">
        <h1 className="text-4xl">{username}</h1>
        <h1 className="text-4xl">{console.log(favList)}</h1>
        <button onClick={() => dispatch(removefav({ id: 15746, username }))}>
          delete
        </button>
        <button onClick={() => dispatch(addtofav({ id: 15746, username }))}>
          add
        </button>
      </div>
    </>
  );
}
