import Header from "./components/Header/Header";
import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

export const UserDetailsContext = createContext({
  username: "username",
  password: "password",
});
function App() {
  const [user, setUser] = useState({username: "Guest user",
  password: "password"});

  return (
    <>
      <UserDetailsContext.Provider value={{ ...user, provider: setUser }}>
        <Header />
        <Outlet />
      </UserDetailsContext.Provider>
    </>
  );
}

export default App;
