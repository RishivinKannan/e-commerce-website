import { useNavigate } from "react-router-dom";
import { useGetAddressQuery, useGetCartQuery } from "../Redux/api/cartApi";
import {
  usePostOrderMutation,
  usePaymentUpdateMutation,
} from "../Redux/api/orderApi";
import CheckoutProduct from "./CheckoutProduct";
import OrderSummary from "./OrderSummary";
import { useSelector } from "react-redux";
import AddressBox from "./AddressBox";
import { Fragment, useState } from "react";
import RazorpayLogo from "../assets/Razorpay_logo.svg";
import useRazorpay from "react-razorpay";
import { Dialog, Transition } from "@headlessui/react";
import OrderGif from "../assets/successfull.gif";
import Thank from '../assets/Thank_you_forordering.mp3'
const CheckoutPage = () => {
  const [select, setSelect] = useState(0);
  const [dialog, setDialog] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const { data: cartList, isLoading, isError } = useGetCartQuery();
  const { data: addresses } = useGetAddressQuery();
  const [postOrder] = usePostOrderMutation();
  const [paymentUpdate] = usePaymentUpdateMutation();
  const [Razorpay] = useRazorpay();
  const { username, email } = useSelector((state) => state.user);
  const { total } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  if (isLoading) {
    return <div className="min-h-screen"></div>;
  }
  if (
    isError ||
    (cartList.length == 0 && cartList != undefined) ||
    total == 0
  ) {
    navigate("/cart");
  }
  const handlePayment = async () => {
    const data = {
      addressID: addresses[select].id,
      total,
    };
    await postOrder(data)
      .unwrap()
      .then((isSuccess) => {
        const options = {
          key: "rzp_test_iXC2FpSJCsGr65",
          key_secret: "8HottG1pbxFe6OsPSllUuMD2", // Enter the Key ID generated from the Dashboard
          amount: total * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "MYVENDO",
          description: "Test Transaction",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg",
          handler: function (response) {
            const value = {
              orderID: isSuccess.id,
              payment_status: true,
              paymentID: response.razorpay_payment_id,
            };
            paymentUpdate(value);
            setPaymentId(response.razorpay_payment_id);
            setDialog(true);
          },
          prefill: {
            name: username,
            email: email,
            contact: "9999999999",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response) {
          const value = {
            orderID: isSuccess.id,
            payment_status: false,
          };
          paymentUpdate(value);
          alert(response.error.description);
        });

        rzp1.open();
      })
      .catch((error) => {
        alert(JSON.stringify(error.data));
      });
  };

  const closeHandler = () => {
    setDialog(false);
    navigate("/");
  };
  return (
    <div className="w-full pt-24 p-8 min-h-screen  bg-gray-100 space-y-4">
      <h1 className="p-2 text-2xl font-bold">Checkout Page</h1>
      <div className="grid lg:grid-cols-2 gap-x-2">
        <div className="p-4 space-y-4 h-full bg-slate-200/70 rounded-lg">
          {cartList.map((cart) => (
            <CheckoutProduct key={cart.id} {...cart} />
          ))}
          <div className="flex justify-center">
            <OrderSummary />
          </div>
        </div>
        <div className="bg-slate-200/70 h-full rounded-lg">
          <AddressBox selectState={[select, setSelect]} />
        </div>
      </div>
      <div className="w-full flex justify-center  ">
        <div className="w-full lg:w-3/6 p-4 rounded-lg bg-slate-200/70 space-y-4">
          <h1 className="p-2 text-2xl font-bold">Payment Method</h1>
          <div className="p-4 grid md:grid-cols-2">
            <div>
              <label
                htmlFor="payment"
                className="flex gap-8 border-b-2 px-2 pb-6"
              >
                <input type="radio" name="payment" />
                <img src={RazorpayLogo} className="w-44" />
              </label>
            </div>
            <button
              onClick={() => handlePayment()}
              className=" h-16 rounded py-3 px-2  text-white bg-darker text-sm md:text-lg font-bold tracking-wider hover:outline outline-gray-500"
            >
              Procced To Payment
            </button>
          </div>
        </div>
      </div>
      <Transition appear show={dialog} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => closeHandler()}
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
                  <img src={OrderGif} className="w-56" />
                  <audio src={Thank} autoPlay />
                  <h1 className="font-semibold text-2xl text-green-700/80 tracking-wide">
                    Payment Successful
                  </h1>
                  <h1 className="mt-4 text-slate-600/70 font-semibold text-lg leading-9 ">
                    Payment ID : {paymentId}
                  </h1>
                  <span
                    onClick={() => closeHandler()}
                    className=" cursor-pointer underline underline-offset-4 text-indigo-400"
                  >
                    Go back to Home {">"}
                  </span>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default CheckoutPage;
