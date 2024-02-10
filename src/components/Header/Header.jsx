import { NavLink } from "react-router-dom";
import { useState, Fragment, useContext,useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { UserDetailsContext } from "../../App";
import SearchBox from "./SearchBox";
import {
  SearchIcon,
  WishListIcon,
  PriceTrackerIcon,
  CartIcon,
  UserIcon,
  UserSolidIcon,
} from "../../utils/Icons";
import Login from "./Login";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchBox, setSearchBox] = useState(false);
  const [LoginBox, setLoginBox] = useState(false);
  const userDetails = useContext(UserDetailsContext);

  useEffect(()=>{
    const logged = localStorage.getItem('loggedUser') ? true : false;
    setLoggedIn(logged);
  },[])

  function userAuthentication(emailValue, passwordValue) {
    const users = localStorage.getItem("Users")
      ? JSON.parse(localStorage.getItem("Users"))
      : [];
    const getUser = users.filter((user) => {
      return user.email.toLowerCase() == emailValue.toLowerCase();
    });
    getUser.length == 0
      ? alert("This Email is not registered ")
      : getUser[0].password != passwordValue
      ? alert("Password does not match")
      : login(getUser[0].username, getUser[0].email);
  }
  function login(username, email) {
    userDetails.provider({
      ...userDetails,
      username: username,
      email: email,
    });
    // localStorage.setItem('logged','true');
    localStorage.setItem('loggedUser',JSON.stringify({ username: username,
      email: email,}))
    setLoggedIn(true);
    setLoginBox(false);
  }

  function logout() {
    userDetails.provider({
      ...userDetails,
      username: "Guest User",
      email: "guestuser@mail.com",
    });
    localStorage.removeItem('loggedUser')
    setLoggedIn(false);
  }

  return (
    <header className="fixed w-screen flex justify-between items-center py-6 px-8 bg-darker text-white z-50 ">
      <NavLink to="/">
        <h1 className="text-2xl font-extrabold tracking-widest md:text-3xl">
          SHOP
        </h1>
      </NavLink>

      <div
        className={`bg-gray-500/10 absolute top-20 w-full left-0 p-4 lg:relative lg:top-0 lg:w-2/6 lg:p-0 lg:block  transition-all ease-in-out delay-100 lg:translate-y-0 lg:z-auto lg:opacity-100 ${
          searchBox ? "" : "-translate-y-20 -z-10 opacity-0 "
        }`}
      >
        <SearchBox setShow={setSearchBox} />
      </div>

      <div className="flex">
        <div className="p-1 flex space-x-4 md:p-2 md:space-x-6 items-center">
          <button
            className="lg:hidden hover:text-gray-500"
            onClick={() => setSearchBox((prev) => !prev)}
          >
            <SearchIcon />
          </button>
          {/* Wishlist */}
          <NavLink to="/wishlist" className={"hover:text-gray-500"}>
            <WishListIcon />
          </NavLink>
          {/* Cart */}
          <NavLink to="/cart" className={"hover:text-gray-500"}>
            <CartIcon />
          </NavLink>
          {/* PriceTracker */}
          <NavLink className={"hover:text-gray-500"}>
            <PriceTrackerIcon />
          </NavLink>
        </div>

        {/* User */}

        {loggedIn ? (
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button
                  className={`ml-6 flex items-center justify-between rounded md:p-3 hover:outline-gray-200 ${
                    open ? "md:outline" : "md:hover:outline md:hover:outline-1"
                  }`}
                >
                  {open ? setSearchBox(false) : ""}
                  {open ? <UserSolidIcon className="w-8 h-8" /> : <UserIcon />}

                  <span className="ml-2 font-semibold text-lg hidden md:inline">
                    {userDetails.username == ""
                      ? "Username"
                      : userDetails.username}
                  </span>
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel
                    className={`absolute z-[100]  text-black w-80  right-0 mt-1 top-20`}
                  >
                    <div className="overflow-hidden rounded-lg shadow-xl ring-1 ring-black/5 bg-white">
                      <div className="flex justify-start items-center space-x-4 p-6">
                        <UserSolidIcon className="w-11 h-11" />
                        <div>
                          <span className="ml-2 font-semibold text-lg  ">
                            {userDetails.username}
                          </span>
                          <p className="ml-2">{userDetails.email}</p>
                        </div>
                      </div>
                      <hr className="bg-gray-200 h-[2px] w-full" />
                      <div >
                        <ul>
                          <li className="px-4 py-2 font-semibold hover:bg-gray-300 hover:text-gray-600">
                            Account
                          </li>
                          <li className="px-4 py-2 font-semibold hover:bg-gray-300 hover:text-gray-600">
                            Orders
                          </li>
                          <li className="px-4 py-2 font-semibold hover:bg-gray-300 hover:text-gray-600">
                            History
                          </li>
                          <li className="px-4 py-2 font-semibold hover:bg-gray-300 hover:text-gray-600">
                            Saved Address
                          </li>
                          <li
                            className="px-4 py-2 font-semibold hover:bg-gray-300 hover:text-gray-600"
                            onClick={() => logout()}
                          >
                            Logout
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        ) : (
          <>
            <button
              className="ml-6 px-4 font-bold text-lg bg-white text-darker rounded hover:outline hover:outline-offset-2 hover:outline-gray-300"
              onClick={() => {
                setLoginBox(true);
                setSearchBox(false);
              }}
            >
              Login
            </button>
          </>
        )}
      </div>

      <Login open={LoginBox} close={setLoginBox} submit={userAuthentication} />
    </header>
  );
};

export default Header;
