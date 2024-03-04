import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";


const CustomerApp = () => {

  return (
    <Provider store={store}>
      
      <Outlet />
    </Provider>
  );
};
export default CustomerApp;
