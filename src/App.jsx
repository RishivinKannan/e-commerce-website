import Header from "./components/Header/Header";
import { Outlet, ScrollRestoration } from "react-router-dom";


function App() {

  return (
    <>
        <ScrollRestoration
          getKey={(location) => {
            return location.pathname == "/" ? location.pathname : location.key;
          }}
        />
          <Header />
          <Outlet />
      
    </>
  );
}

export default App;
