import { Outlet, useNavigate, useLocation } from "react-router-dom";
import VendorHeader from "./VendorHeader";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const VendorHomePage = () => {
  const { isLogged } = useSelector((state) => state.vendor);
  const redirect = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!isLogged) {
      redirect("/vendor/login");
    }
    console.log(location.pathname);
    if (location.pathname === "/vendor/" || location.pathname === "/vendor") {
      redirect("/vendor/home");
    }
  }, [isLogged, redirect, location]);
  return (
    <>
      <VendorHeader />
      <Sidebar />
      <div className="pt-16 pl-44 lg:pl-60">
        <Outlet />
      </div>
    </>
  );
};

export default VendorHomePage;
