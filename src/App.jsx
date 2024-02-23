import Header from "./components/Header/Header";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";

function App() {

  return (
    <>
      <Provider store={store}>
        <ScrollRestoration
          getKey={(location) => {
            return location.pathname == "/" ? location.pathname : location.key;
          }}
        />
          <Header />
          <Outlet />
      </Provider>
    </>
  );
}

export default App;
