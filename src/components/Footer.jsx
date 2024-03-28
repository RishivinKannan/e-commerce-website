import { Link } from "react-router-dom";
import Logo from "../utils/Logo";

const Footer = () => {
  return (
    <footer className="relative z-10 w-full bg-darker px-10 md:px-20 pt-14 pb-4 gap-y-6 grid grid-cols-2 md:grid-cols-3 text-white">
      <div className="flex flex-col p-2 justify-center md:items-start items-center col-span-2 md:col-span-1">
        <Logo className={"w-40 "} />

      </div>
      <div className="flex flex-col  space-y-2">
        <h1 className="text-lg font-semibold tracking-wider text-gray-400">Navigation</h1>
        <ul className="tracking-wide cursor-pointer space-y-2">
          <li className="hover:text-gray-600"><Link to={'/'}>Home</Link></li>
          <li className="hover:text-gray-600">About Us</li>
          <li className="hover:text-gray-600"><Link to='/cart'>Cart</Link></li>
          <li className="hover:text-gray-600"><Link to='/wishlist'>WishList</Link></li>
          <li className="hover:text-gray-600"><Link to='/vendor'>Want to be vendor?</Link></li>
        </ul>
      </div>
      <div className="flex flex-col space-y-2">
        <h1 className="text-lg font-semibold tracking-wider text-gray-400">Popular Categories</h1>
        <ul className="tracking-wide cursor-pointer space-y-2">
          <li className="hover:text-gray-600"><Link to={'/'}>Vendor Store</Link></li>
          <li className="hover:text-gray-600"><Link to='/category?name=Top-Wear'>Top wear</Link></li>
          <li className="hover:text-gray-600"><Link to='/category?name=Bottom-Wear'>Bottom wear</Link></li>
          <li className="hover:text-gray-600"><Link to='/category?name=Foot-Wear'>Foot wear</Link></li>
        </ul>
      </div>

      <div className="flex justify-center items-center"></div>
    </footer>
  );
};

export default Footer;
