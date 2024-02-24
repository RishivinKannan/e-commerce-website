import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getcart,
  incrementqty,
  decrementqty,
  deleteitem,
  addtocart
} from "./Redux/services/cartSlice";
export default function Test() {
  const { username } = useSelector((state) => state.user);
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getcart({ username }));
  }, [dispatch, username]);
  return (
    <>
      <div className="h-screen flex justify-center items-center gap-8">
        <h1 className="text-4xl">{username}</h1>
        <h1 className="text-4xl">{console.log(cartList)}</h1>
        <button onClick={() => dispatch(incrementqty({ id: "15746", username }))}>
          CLICK
        </button>
        <button onClick={() => dispatch(decrementqty({ id: "15746", username }))}>
          ----
        </button>
        <button onClick={() => dispatch(deleteitem({ id: "15746", username }))}>
          delete
        </button>
        <button
          onClick={() =>
            dispatch(addtocart({ id: "15746", qty: 2 , username }))
          }
        >
          add
        </button>
      </div>
    </>
  );
}
