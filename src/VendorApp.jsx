import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import vendorStore from "./Redux/vendorStore";


const VendorApp = () => {

  return (
    <Provider store={vendorStore}>
      <Outlet />
    </Provider>
  );
};
export default VendorApp;