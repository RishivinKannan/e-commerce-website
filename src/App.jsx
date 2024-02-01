import Header from "./components/Header";
import { createContext, useState } from "react";
export const UserDetailsContext = createContext({
  username: "username",
  password: "password",
});
function App() {
  const [user, setUser] = useState({});

  return (
    <>
      <UserDetailsContext.Provider value={{...user,provider:setUser}}>
        <Header />
      </UserDetailsContext.Provider>
    </>
  );
}

export default App;
