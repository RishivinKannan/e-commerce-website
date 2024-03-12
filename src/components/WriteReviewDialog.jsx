import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Rating } from "@smastrom/react-rating";
import { useSelector } from "react-redux";
// eslint-disable-next-line react/prop-types
export default function WriteReviewDialog({ open, close, submit }) {
  const [rating, setRating] = useState(0);
  const { username, isLogged } = useSelector((state) => state.user);
  const sendReview = (e) => {
    e.preventDefault();
    submit(e.target.review.value, rating);
  };
  if (!isLogged) {
    return <></>;
  }

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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all flex justify-center items-center flex-col space-y-4">
                <Dialog.Title
                  as="h3"
                  className="w-10/12 text-2xl font-bold  tracking-wide text-gray-900"
                >
                  Write a review
                </Dialog.Title>
                <h1 className="w-10/12 font-semibold tracking-wide px-1 text-gray-500">
                  {username}
                </h1>
                <form onSubmit={(e) => sendReview(e)} className="space-y-6">
                <Rating
                  className="max-w-28"
                  value={rating}
                  onChange={setRating}
                />
                  <textarea
                    autoFocus
                    placeholder="Share your thoughts about this product"
                    rows={6}
                    cols={30}
                    className="border-[3px] bg-gray-100 w-full rounded p-5 font-semibold focus:outline-none focus:border-gray-500 placeholder:text-gray-500"
                    name="review"
                    required
                  />

                  <div className="">
                    <button
                      type="submit"
                      className="inline-flex justify-center font-semibold text-lg tracking-wide rounded-md border border-transparent bg-black px-4 py-1  text-white hover:outline  outline-gray-500"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
