import { NavLink } from "react-router-dom";
import { useState, Fragment, useContext } from "react";
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

  function userAuthentication(userNameValue, passwordValue) {
    userDetails.provider({
      ...userDetails,
      username: userNameValue,
      password: passwordValue,
    });
    setLoggedIn(true);
    setLoginBox(false);
  }

  return (
    <div className="flex justify-between items-center p-6 bg-black text-white ">
      <NavLink to="/test">
        <h1 className="text-2xl font-extrabold tracking-widest md:max-2xl:text-3xl">
          SHOP
        </h1>
      </NavLink>

      <div
        className={`bg-gray-500/10 absolute top-20 w-full left-0 p-4 lg:max-2xl:relative lg:max-2xl:top-0 lg:max-2xl:w-96 lg:max-2xl:p-0 lg:max-2xl:block transition-all ease-in-out delay-100 lg:max-2xl:translate-y-0 lg:max-2xl:z-auto lg:max-2xl:opacity-100 ${
          searchBox ? "" : "-translate-y-20 -z-10 opacity-0 "
        }`}
      >
        <SearchBox />
      </div>

      <div className="flex">
        <div className="p-1 flex space-x-4 md:max-2xl:p-2 md:max-2xl:space-x-6 items-center">
          <button
            className="lg:max-2xl:hidden hover:text-gray-500"
            onClick={() => setSearchBox((prev) => !prev)}
          >
            <SearchIcon />
          </button>
          {/* Wislist */}
          <NavLink className={"hover:text-gray-500"}>
            <WishListIcon />
          </NavLink>
          {/* Cart */}
          <NavLink className={"hover:text-gray-500"}>
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
                  className={`ml-6 flex items-center justify-between rounded md:max-2xl:p-3 hover:outline-gray-200 ${
                    open
                      ? "md:max-2xl:outline"
                      : "md:max-2xl:hover:outline md:max-2xl:hover:outline-1"
                  }`}
                >
                  {open ? setSearchBox(false) : ""}
                  {open ? <UserSolidIcon className="w-8 h-8" /> : <UserIcon />}

                  <span className="ml-2 font-semibold text-lg hidden md:max-2xl:inline">
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
                    className={`absolute z-[100] text-black w-80  right-0 mt-1 top-20`}
                  >
                    <div className="overflow-hidden rounded-lg shadow-xl ring-1 ring-black/5">
                      <div className="flex justify-start items-center space-x-4 p-6">
                        <UserSolidIcon className="w-11 h-11" />
                        <div>
                          <span className="ml-2 font-semibold text-lg  ">
                            {userDetails.username == ""
                              ? "username"
                              : userDetails.username}
                          </span>
                          <p className="ml-2">usermail@email.com</p>
                        </div>
                      </div>
                      <hr className="bg-gray-200 h-[2px] w-full" />
                      <div className="py-2">
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
                            onClick={() => setLoggedIn(false)}
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
          <button
            className="ml-6 px-4 font-bold text-lg bg-white text-black rounded hover:bg-gray-200 hover:text-gray-500"
            onClick={() => {
              setLoginBox(true);
              setSearchBox(false);
            }}
          >
            Login
          </button>
        )}
      </div>

      <Login open={LoginBox} close={setLoginBox} submit={userAuthentication} />
    </div>
  );
};

export default Header;
