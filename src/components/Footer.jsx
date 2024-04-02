import { Link } from "react-router-dom";
import Logo from "../utils/Logo";
import { categories } from "../utils/constants";

const Footer = () => {
  return (
    <footer className="relative z-10 grid grid-cols-2 px-10 pb-4 text-white bg-darker md:px-20 pt-14 gap-y-6 md:grid-cols-3">
      <div className="flex flex-col items-center justify-center col-span-2 p-2 md:items-start md:col-span-1">
        <Logo className={"w-40 "} />
      </div>
      <div className="flex flex-col space-y-2">
        <h1 className="text-lg font-semibold tracking-wider text-gray-400">
          Navigation
        </h1>
        <ul className="space-y-2 tracking-wide cursor-pointer">
          <li className="hover:text-gray-600">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="hover:text-gray-600">About Us</li>
          <li className="hover:text-gray-600">
            <Link to="/cart">Cart</Link>
          </li>
          <li className="hover:text-gray-600">
            <Link to="/wishlist">WishList</Link>
          </li>
          <li className="hover:text-gray-600">
            <Link to="/vendor">Want to be vendor?</Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col space-y-2">
        <h1 className="text-lg font-semibold tracking-wider text-gray-400 ">
          Popular Categories
        </h1>
        <ul className="grid gap-2 tracking-wide cursor-pointer md:grid-cols-2 ">
          <li className="hover:text-gray-600">
            <Link to={"/"}>Vendor Store</Link>
          </li>
          {categories.map(({ name }) => (
            <li key={name} className="hover:text-gray-600">
              <Link to={`/category/${name.replace(/\s+/g, "-")}`}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-center"></div>
    </footer>
  );
};

export default Footer;
