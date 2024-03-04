import Header from "./components/Header/Header";
import { Outlet, ScrollRestoration } from "react-router-dom";
import welcome from "./assets/welcome2.mp3";
function App() {
  return (
    <>
      <ScrollRestoration
        getKey={(location) => {
          return location.pathname == "/" ? location.pathname : location.key;
        }}
      />
      <audio src={welcome} autoPlay />
      <Header />
      <Outlet />
    </>
  );
}

export default App;
