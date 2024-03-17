import { NavLink } from "react-router-dom";
import Logo from "../../utils/Logo";
import { UserIcon } from "../../utils/Icons";
import { useSelector } from "react-redux";

const VendorHeader = () => {
  const { vendorName } = useSelector((state) => state.vendor);
  return (
    <div className="fixed w-screen flex justify-between items-center p-4 px-10 z-50 bg-darker">
      <NavLink to="/vendor/home">
        <Logo className={"w-32 "} />
      </NavLink>

      <div className="text-white flex justify-center items-center ">
        <UserIcon />
        <span className="ml-2 font-semibold text-lg hidden md:inline">
          {vendorName}
        </span>
      </div>
    </div>
  );
};

export default VendorHeader;
