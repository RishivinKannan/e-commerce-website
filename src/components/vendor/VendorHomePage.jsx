import { Outlet, useNavigate } from "react-router-dom";
import VendorHeader from "./VendorHeader";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const VendorHomePage = () => {
  const { isLogged } = useSelector((state) => state.vendor);
  const redirect = useNavigate();
  useEffect(() => {
    if (!isLogged) {
      redirect("/vendor/login");
    }
  }, [isLogged, redirect]);
  return (
    <>
      <VendorHeader />
      <Sidebar />
      <div className="pt-16 pl-60">
        <Outlet />
      </div>
    </>
  );
};

export default VendorHomePage;
