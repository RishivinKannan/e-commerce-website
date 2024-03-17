import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const Links = [
    {
      name: "Dashboard",
      path: "/vendor/home",
    },
    {
      name: "Products",
      path: "/vendor/products",
    },
    {
      name: "Questions",
      path: "/vendor/questions",
    },
    {
      name: "Orders",
      path: "/vendor/orders",
    },
    {
      name: "Account",
      path: "/vendor/account",
    },
  ];
  return (
    <div className="fixed h-screen w-44 lg:w-60 bg-darker z-40 pt-16 text-white ">
      <div className="flex flex-col  items-center py-6 w-full ">
        {Links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({isActive}) =>
              `w-full flex justify-center py-6  tracking-wider rounded font-semibold border-b-2 border-slate-800 hover:bg-gray-600 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
