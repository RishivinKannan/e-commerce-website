import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { vendorlogout } from "../../Redux/vendorServices/vendorSlice";
import {
  DashboardIcon,
  LogoutIcon,
  OrdersIcon,
  ProductsIcon,
  QuestionsIcon,
  UserIcon,
} from "../../utils/Icons";

const Sidebar = () => {
  const dispatch = useDispatch();
  const Links = [
    {
      name: "Dashboard",
      path: "/vendor/home",
      icon: <DashboardIcon className="w-6 " />,
    },
    {
      name: "Products",
      path: "/vendor/products",
      icon: <ProductsIcon className="w-6 " />,
    },
    {
      name: "Orders",
      path: "/vendor/orders",
      icon: <OrdersIcon className="w-6 " />,
    },
    {
      name: "Questions",
      path: "/vendor/questions",
      icon: <QuestionsIcon className="w-6 " />,
    },
    {
      name: "Account",
      path: "/vendor/account",
      icon: <UserIcon className="w-7 " />,
    },
  ];
  return (
    <div className="fixed h-screen w-44 lg:w-60 bg-darker z-40 pt-16 text-white ">
      <div className="flex flex-col  items-center py-6 w-full ">
        {Links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `w-full grid grid-cols-3 py-6  tracking-wider rounded font-semibold border-b-2 border-slate-800 hover:bg-gray-600 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <div className="flex justify-center">{link?.icon}</div>
            {link.name}
          </NavLink>
        ))}
        <button
          className="w-full grid grid-cols-3 py-6 tracking-wider rounded font-semibold border-b-2 border-slate-800 hover:bg-gray-600"
          onClick={() => dispatch(vendorlogout())}
        >
          <div className="flex justify-center">
            <LogoutIcon className='w-6'/>
          </div>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
