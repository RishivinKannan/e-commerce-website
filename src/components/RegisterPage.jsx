import { useState } from "react";
import {
  checkUserRegister,
  validateEmail,
  validatePassword,
  storeUserData
} from "../utils/registerUtils";
import {BackArrowIcon} from '../utils/Icons'
import { useNavigate,Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getuser } from "../Redux/services/userSlice";

function RegisterPage() {
  const [emailCode, setEmailCode] = useState("");
  const [passErrorCode, setPassErrorCode] = useState("");
  const toNavigate = useNavigate();
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    const regesiteredUser = checkUserRegister(e.target.email.value);
    const emailbool = validateEmail(e.target.email.value);
    const { bool, statement } = validatePassword(
      e.target.password.value,
      e.target.repassword.value
    );
    if (!emailbool) {
      setEmailCode("Invalid Email");
    } else if (regesiteredUser) {
      setEmailCode("Already Registered");
    } else if (!bool) {
      setEmailCode("");
      setPassErrorCode(statement);
    } else {
      setEmailCode("");
      setPassErrorCode("");
      storeUserData(
        e.target.fullname.value,
        e.target.email.value,
        e.target.password.value
      );
      localStorage.setItem('loggedUser',JSON.stringify({ username: e.target.fullname.value,
        email: e.target.email.value,}))
      dispatch(getuser())
      toNavigate("/");

    }
  }


  return (
    <div className="relative bg-black/15 min-h-screen flex justify-center items-center">
      <div className="absolute top-8 left-8 text-xl font-bold tracking-wide flex items-center gap-2">
        <BackArrowIcon/>
        <Link to={'/'}>Back to Home </Link></div>
      <div className="bg-white w-5/12 shadow-xl p-6 flex flex-col items-center space-y-8 min-w-96">
        <h1 className="block text-2xl font-bold tracking-wide  text-center">
          Register Here
        </h1>
        <form
          className="space-y-6 w-5/6 flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Name"
            name="fullname"
            className="border-[3px] bg-gray-200  w-full h-10 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500"
          />
          <div className="w-full">
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="border-[3px] bg-gray-200  w-full h-10 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500"
            />
            {emailCode == "" ? (
              ""
            ) : (
              <span className="text-red-500 block text-left text-base w-full pl-2">
                * {emailCode}
              </span>
            )}
          </div>
          <div className="w-full">
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="border-[3px] bg-gray-200  w-full h-10 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500"
            />
            {passErrorCode == "" ? (
              ""
            ) : (
              <span className="text-red-500 block text-left text-base w-full pl-2">
                * {passErrorCode}
              </span>
            )}
          </div>
          <div className="w-full">
            <input
              type="password"
              placeholder="Re-Password"
              name="repassword"
              className="border-[3px] bg-gray-200  w-full h-10 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500"
            />
            {passErrorCode == "" ? (
              ""
            ) : (
              <span className="text-red-500 block text-left text-base w-full pl-2">
                * {passErrorCode}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="inline-flex justify-center font-semibold text-lg tracking-wide rounded-md border border-transparent bg-black px-4 py-1  text-white hover:outline  outline-gray-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
