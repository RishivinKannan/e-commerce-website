/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
// eslint-disable-next-line react/prop-types
export default function AddAddressDialog({ open, close, submit, address }) {
  const { isLogged } = useSelector((state) => state.user);

  if (!isLogged) {
    return <></>;
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => close()}>
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all flex justify-center items-center flex-col space-y-4">
                <Dialog.Title
                  as="h3"
                  className="w-10/12 text-center text-2xl font-bold  tracking-wide text-gray-900"
                >
                  Add Address
                </Dialog.Title>
                <Formik
                  initialValues={{
                    title: address.title,
                    line_1: address.line_1,
                    line_2: address.line_2,
                    city: address.city,
                    state: address.state,
                    pincode: address.pincode,
                  }}
                  onSubmit={(values) => {
                    submit({ id: address.id, ...values });
                  }}
                >
                  <Form className="space-y-3 w-full flex flex-col items-center">
                    <Field
                      type="text"
                      name="title"
                      placeholder="Address Title"
                      className="border-[3px] bg-gray-200  w-5/6 h-10 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500 disabled:text-gray-500"
                    />
                    <Field
                      type="text"
                      name="line_1"
                      placeholder="Address Line 1"
                      className="border-[3px] bg-gray-200  w-5/6 h-10 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500 disabled:text-gray-500"
                    />
                    <Field
                      type="text"
                      name="line_2"
                      placeholder="Address Line 2"
                      className="border-[3px] bg-gray-200  w-5/6 h-10 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500 disabled:text-gray-500"
                    />
                    <Field
                      type="text"
                      name="city"
                      placeholder="City"
                      className="border-[3px] bg-gray-200  w-5/6 h-10 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500 disabled:text-gray-500"
                    />
                    <Field
                      type="text"
                      name="state"
                      placeholder="State"
                      className="border-[3px] bg-gray-200  w-5/6 h-10 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500 disabled:text-gray-500"
                    />
                    <Field
                      type="text"
                      name="pincode"
                      placeholder="Pincode"
                      className="border-[3px] bg-gray-200  w-5/6 h-10 rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500 disabled:text-gray-500"
                    />
                    <div className="flex gap-8">
                      <Field
                        type="submit"
                        value="Update"
                        className="inline-flex justify-center font-semibold text-lg tracking-wide rounded-md border border-transparent bg-black px-4 py-1  text-white hover:outline  outline-gray-500"
                      />
                      <Field
                        type="button"
                        value="Cancel"
                        onClick={() => {
                          close();
                        }}
                        className="inline-flex justify-center font-semibold text-lg tracking-wide rounded-md border border-transparent bg-red-600 px-4 py-1  text-white hover:outline  outline-gray-500"
                      />
                    </div>
                  </Form>
                </Formik>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
