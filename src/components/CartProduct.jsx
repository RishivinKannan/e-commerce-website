import { DeleteIcon } from "../utils/Icons.jsx";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserDetailsContext } from "../App";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function CartProduct({ id, qty, deleteProduct }) {
  const [product, setProduct] = useState([]);
  const [qtyState, setQtyState] = useState(qty);
  const { username } = useContext(UserDetailsContext);

  useEffect(() => {
    axios.get("../fashionProducts.json").then((res) => {
      setProduct(res.data.filter((data) => data.ProductId.toString() == id));
    });
  }, [id]);

  function increment(e) {
    e.preventDefault();
    setQtyState((prev) => prev + 1);
    const cartList = localStorage.getItem(`${username}-Cart`)
      ? JSON.parse(localStorage.getItem(`${username}-Cart`))
      : [];
    const temp = cartList.filter((item) => {
      return item.id == id;
    });
    const index = cartList.indexOf(temp[0]);

    cartList[index].qty = qtyState + 1;
    localStorage.setItem(`${username}-Cart`, JSON.stringify(cartList));
  }
  function decrement(e) {
    e.preventDefault();
    if (qtyState > 1) {
      setQtyState((prev) => prev - 1);
      const cartList = localStorage.getItem(`${username}-Cart`)
        ? JSON.parse(localStorage.getItem(`${username}-Cart`))
        : [];
      const temp = cartList.filter((item) => {
        return item.id == id;
      });
      const index = cartList.indexOf(temp[0]);

      cartList[index].qty = qtyState - 1;
      localStorage.setItem(`${username}-Cart`, JSON.stringify(cartList));
    }
  }
  function Cartdelete(e) {
    e.preventDefault();
    const cartList = localStorage.getItem(`${username}-Cart`)
      ? JSON.parse(localStorage.getItem(`${username}-Cart`))
      : [];
    const temp = cartList.filter((item) => {
      return item.id == id;
    });
    const index = cartList.indexOf(temp[0]);

    cartList.splice(index, 1);
    localStorage.setItem(`${username}-Cart`, JSON.stringify(cartList));
    deleteProduct(cartList);
  }

  return product == [] ? null : (
    <div className="w-full  py-5 px-3 flex flex-col gap-4 md:flex-col lg:flex-row lg:justify-between rounded-lg shadow-xl bg-gray-50 ">
      <Link to={`/product/${id}`}>
        <div className="flex gap-2">
          <img
            src={product[0]?.ImageURL}
            className="min-w-20 min-h-20 max-20 max-h-20 rounded-lg shadow-lg lg:max-w-28 lg:max-h-28 lg:min-w-28 lg:min-h-28"
          />
          <div className=" flex flex-col flex-wrap justify-around  ">
            <h2 className="text-lg lg:text-xl leading-5 font-semibold sm:tracking-wider lg:tracking-widest pl-2 md:min-w-80">
              {product[0]?.ProductTitle}
            </h2>
            <span className="text-xl pl-2 font-extrabold tracking-widest text-gray-900">
              ₹200
            </span>
          </div>
        </div>
      </Link>
      <div className="p-2 flex lg:flex-col justify-between lg:items-end flex-row-reverse items-center">
        <button onClick={Cartdelete}>
          <DeleteIcon />
        </button>
        <div className="flex rounded outline outline-1 outline-slate-200">
          <button
            className=" bg-slate-200 w-7 h-7 rounded-l"
            onClick={decrement}
          >
            -
          </button>
          <span className="w-7 text-center text-lg font-semibold">
            {qtyState}
          </span>
          <button
            className="bg-slate-200 w-7 h-7 rounded-r"
            onClick={increment}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
