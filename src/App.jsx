import Header from "./components/Header/Header";
import { Outlet, ScrollRestoration } from "react-router-dom";
import welcome from "./assets/Welcome.mp3";
import Footer from "./components/Footer";
import { useGetUserProfileQuery } from "./Redux/api/user";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import Pop from "./assets/partypopper.gif";

function App() {
  const [dialog, setDialog] = useState(false);
  const { data: user, isSuccess } = useGetUserProfileQuery();
  useEffect(() => {
    if (isSuccess) {
      const dob = user.dob?.slice(6, 12);
      const date = new Date();
      const today = date.getMonth() + 1 + "-" + date.getDate();
      if (today == dob) {
        setDialog(true);
      }
    }
  }, [user, isSuccess]);
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
      <Footer />
      <Transition appear show={dialog} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setDialog(false)}
        >
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
                <Dialog.Panel className="w-4/6 h-96 transform overflow-hidden rounded-2xl bg-white p-12 text-left align-middle shadow-xl transition-all flex justify-center items-center flex-col space-y-4">
                  <div className="flex items-center">
                    <img src={Pop} className="w-24" />
                    <h1 className="font-bold text-4xl p-1 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-pink-500 tracking-wide">
                      Happy Birthday To You
                    </h1>
                    <img src={Pop} className="transform -scale-x-100 w-24" />
                  </div>
                  <h1 className="mt-4 text-slate-800/70 font-semibold text-lg leading-9 ">
                    To celebrate this wonderfull day
                  </h1>
                  <h1 className=" text-slate-800/70 font-semibold text-lg leading-9 ">
                    Use Coupon Code :{" "}
                    <span className="text-yellow-500">ITSYOURBIRTHDAY</span>
                  </h1>
                  <h1 className=" text-slate-600/70 font-semibold text-lg leading-9 ">
                    Get <span className="text-red-700">100 Rs</span> OFF
                  </h1>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default App;
