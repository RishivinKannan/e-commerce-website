import { NavLink, Link } from "react-router-dom";
import { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userlogin, userlogout } from "../../Redux/services/userSlice";
import { Popover, Transition } from "@headlessui/react";
import SearchBox from "./SearchBox";
import {
  SearchIcon,
  WishListIcon,
  PriceTrackerIcon,
  CartIcon,
  UserIcon,
  UserSolidIcon,
} from "../../utils/Icons";
import Logo from "../../utils/Logo";
import Login from "./Login";
// import { useGetUserTokenMutation } from "../../Redux/api/user";
import axios from "axios";

const Header = () => {
  const [searchBox, setSearchBox] = useState(false);
  const [LoginBox, setLoginBox] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const {
    username,
    email,
    isLogged: loggedIn,
  } = useSelector((state) => state.user);
  // const [getToken, { data, isError }] = useGetUserTokenMutation();
  const dispatch = useDispatch();

  async function userAuthentication(emailValue, passwordValue) {
    // const users = localStorage.getItem("Users")
    //   ? JSON.parse(localStorage.getItem("Users"))
    //   : [];
    // const getUser = users.filter((user) => {
    //   return user.email.toLowerCase() == emailValue.toLowerCase();
    // });
    // getUser.length == 0
    //   ? alert("This Email is not registered ")
    //   : getUser[0].password != passwordValue
    //   ? alert("Password does not match")
    //   : login(getUser[0].username, getUser[0].email);
    setIsFetching((prev) => !prev);
    axios
      .post("http://localhost:8000/api/user/login", {
        email: emailValue,
        password: passwordValue,
      })
      .then((res) => {
        console.log(res);
        login(res.data);
        setIsFetching((prev) => !prev);
      })
      .catch((error) => {
        alert(error.response.data.detail);
        setIsFetching((prev) => !prev);
      });
  }
  function login(userdata) {
    dispatch(userlogin(userdata));
    setLoginBox(false);
  }

  function logout() {
    dispatch(userlogout());
  }

  return (
    <header
      className={` fixed w-screen flex justify-between items-center py-6 ${
        loggedIn ? "lg:py-3" : "lg:py-6"
      } px-8 bg-darker text-white z-50 `}
    >
      <NavLink to="/">
        <Logo className={"w-32 "} />
      </NavLink>

      <div
        className={`bg-gray-500/10 absolute top-20 w-full left-0 p-4 lg:relative lg:top-0 lg:w-2/6 lg:p-0 lg:block  transition-all ease-in-out delay-100 lg:translate-y-0 lg:z-auto lg:opacity-100 ${
          searchBox ? "" : "-translate-y-20 -z-10 opacity-0 "
        }`}
      >
        <SearchBox setShow={setSearchBox} />
      </div>

      <div className="flex">
        <div className="flex items-center p-1 space-x-4 md:p-2 md:space-x-6">
          <button
            className="lg:hidden hover:text-gray-500"
            onClick={() => setSearchBox((prev) => !prev)}
          >
            <SearchIcon />
          </button>
          {/* Wishlist */}
          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              `hover:text-gray-500 ${isActive ? "text-red-300" : ""}`
            }
          >
            <WishListIcon />
          </NavLink>
          {/* Cart */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `hover:text-gray-500 ${
                isActive ? "text-blue-300" : ""
              } flex gap-1`
            }
          >
            <CartIcon />
            {/* <span className="font-bold">4</span> */}
          </NavLink>
          {/* PriceTracker */}
          <NavLink to="/pricetracker" className={"hover:text-gray-500"}>
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

                  <span className="hidden ml-2 text-lg font-semibold md:inline">
                    {username}
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
                    className={`absolute z-[100]  text-black min-w-80  right-0 mt-1 top-20`}
                  >
                    <div className="overflow-hidden bg-white rounded-lg shadow-xl ring-1 ring-black/5">
                      <div className="flex items-center justify-start p-6 space-x-4 ">
                        <UserSolidIcon className="w-11 h-11" />
                        <div>
                          <span className="ml-2 text-lg font-semibold ">
                            {username}
                          </span>
                          <p className="ml-2">{email}</p>
                        </div>
                      </div>
                      <hr className="bg-gray-200 h-[2px] w-full" />
                      <div>
                        <ul>
                          <li className="px-4 py-2 font-semibold hover:bg-gray-300 hover:text-gray-600">
                            <Link to={"/account"}>Account</Link>
                          </li>
                          <li className="px-4 py-2 font-semibold hover:bg-gray-300 hover:text-gray-600">
                            <Link to={"/orders"}>Orders</Link>
                          </li>
                          <li className="px-4 py-2 font-semibold hover:bg-gray-300 hover:text-gray-600">
                            <Link to={"/history"}>History</Link>
                          </li>
                          <li className="px-4 py-2 font-semibold hover:bg-gray-300 hover:text-gray-600">
                            <Link to={"/address"}>Saved Address</Link>
                          </li>
                          <li className="px-4 py-2 font-semibold hover:bg-gray-300 hover:text-gray-600">
                            <Link to={"/vendor/home"}>Want to be vendor?</Link>
                          </li>
                          <li
                            className="px-4 py-2 font-semibold cursor-pointer hover:bg-gray-300 hover:text-gray-600"
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
              className="px-4 ml-6 text-lg font-bold bg-white rounded text-darker hover:outline hover:outline-offset-2 hover:outline-gray-300"
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

      <Login
        open={LoginBox}
        isFetching={isFetching}
        close={setLoginBox}
        submit={userAuthentication}
      />
    </header>
  );
};

export default Header;
