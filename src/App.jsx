import Header from "./components/Header/Header";
import { createContext, useState, useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";

export const UserDetailsContext = createContext({
  username: "username",
  email: "user@email.com",
});
function App() {
  const [user, setUser] = useState({
    username: "Guest user",
    email: "guestuser@gmail.com",
  });
  useEffect(() => {
    const logged = localStorage.getItem("loggedUser")
      ? JSON.parse(localStorage.getItem("loggedUser"))
      : {
          username: "Guest user",
          email: "guestuser@gmail.com",
        };
    if (logged) {
      setUser(logged);
    }
  }, []);
  return (
    <>
      <Provider store={store}>
        <ScrollRestoration
          getKey={(location) => {
            return location.pathname == "/" ? location.pathname : location.key;
          }}
        />
        <UserDetailsContext.Provider value={{ ...user, provider: setUser }}>
          <Header />
          <Outlet />
        </UserDetailsContext.Provider>
      </Provider>
    </>
  );
}

export default App;
