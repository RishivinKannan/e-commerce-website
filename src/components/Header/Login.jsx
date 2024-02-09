import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { NavLink } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Login({ open, close, submit }) {
  const [userNameValue, setUserNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => close(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all flex justify-center items-center flex-col space-y-7">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold leading-6 tracking-wide text-gray-900 text-center mb-4"
                >
                  Login
                </Dialog.Title>

                <input
                  type="text"
                  placeholder="USERNAME"
                  className="border-[3px] bg-gray-200  w-10/12 h-10 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500"
                  onChange={(e) => setUserNameValue(e.target.value)}
                  value={userNameValue}
                />
                <div className="w-10/12">
                  <input
                    type="password"
                    placeholder="PASSWORD"
                    className="border-[3px] bg-gray-200 w-full h-10 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500"
                    onChange={(e) => setPasswordValue(e.target.value)}
                  value={passwordValue}
                  />
                  <p className="text-right w-full mt-1 font-semibold text-gray-700">
                    Forgot password ?
                  </p>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center font-semibold text-lg tracking-wide rounded-md border border-transparent bg-black px-4 py-1  text-white hover:outline  outline-gray-500"
                    onClick={() => {
                      submit(userNameValue,passwordValue);
                      setPasswordValue('')
                    }}
                  >
                    Login
                  </button>
                </div>

                <NavLink to="/register">
                  <span className="font-semibold text-gray-700">Create an account</span>
                </NavLink>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
